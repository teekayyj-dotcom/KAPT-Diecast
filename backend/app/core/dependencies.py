from fastapi import Depends
from sqlalchemy.orm import Session

from ..cognito_auth import verify_cognito_token
from ..db.session import get_db
from ..repositories.user_repository import UserRepository
from ..services.auth_service import AuthService


def get_current_app_user(
    cognito_user=Depends(verify_cognito_token),
    db: Session = Depends(get_db),
):
    service = AuthService(UserRepository(db))
    return service.sync_cognito_user(cognito_user)
