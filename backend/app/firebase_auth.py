import os

import firebase_admin
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from firebase_admin import auth, credentials


bearer_scheme = HTTPBearer(auto_error=False)


def get_firebase_app():
    if firebase_admin._apps:
        return firebase_admin.get_app()

    service_account_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

    if service_account_path and os.path.exists(service_account_path):
        return firebase_admin.initialize_app(credentials.Certificate(service_account_path))

    try:
        return firebase_admin.initialize_app()
    except Exception as exc:
        raise RuntimeError(
            "Firebase Admin is not configured. Set GOOGLE_APPLICATION_CREDENTIALS "
            "to your service account JSON path."
        ) from exc


def verify_firebase_token(
    credentials_data: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    if not credentials_data or credentials_data.scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Firebase bearer token",
        )

    try:
        get_firebase_app()
    except RuntimeError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc),
        ) from exc

    try:
        decoded_token = auth.verify_id_token(credentials_data.credentials)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Firebase token",
        ) from exc

    return {
        "uid": decoded_token.get("uid"),
        "email": decoded_token.get("email"),
        "name": decoded_token.get("name"),
        "claims": decoded_token,
    }
