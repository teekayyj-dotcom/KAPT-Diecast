import json
import urllib.request
from functools import lru_cache

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from .core.config import settings


bearer_scheme = HTTPBearer(auto_error=False)


def _build_jwks_url() -> str:
    return (
        f"https://cognito-idp.{settings.cognito_region}.amazonaws.com/"
        f"{settings.cognito_user_pool_id}/.well-known/jwks.json"
    )


@lru_cache(maxsize=1)
def _get_jwks() -> dict:
    with urllib.request.urlopen(_build_jwks_url()) as response:
        return json.load(response)


def _get_signing_key(token: str):
    header = jwt.get_unverified_header(token)

    for attempt in range(2):
        jwks = _get_jwks()

        for key in jwks.get("keys", []):
            if key.get("kid") == header.get("kid"):
                return jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(key))

        if attempt == 0:
            _get_jwks.cache_clear()

    return None


def verify_cognito_token(
    credentials_data: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    if not credentials_data or credentials_data.scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Cognito bearer token",
        )

    if not settings.cognito_user_pool_id or not settings.cognito_client_id:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Cognito is not configured on the backend.",
        )

    token = credentials_data.credentials

    try:
        signing_key = _get_signing_key(token)

        if signing_key is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Unable to find Cognito signing key.",
            )

        issuer = (
            f"https://cognito-idp.{settings.cognito_region}.amazonaws.com/"
            f"{settings.cognito_user_pool_id}"
        )
        decoded_token = jwt.decode(
            token,
            signing_key,
            algorithms=["RS256"],
            audience=settings.cognito_client_id,
            issuer=issuer,
        )
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Cognito token",
        ) from exc

    if decoded_token.get("token_use") != "id":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Expected a Cognito ID token.",
        )

    return {
        "sub": decoded_token.get("sub"),
        "email": decoded_token.get("email"),
        "name": decoded_token.get("name"),
        "username": decoded_token.get("cognito:username"),
        "claims": decoded_token,
    }
