from fastapi import Depends
from sqlalchemy.orm import Session

from ..db.session import get_db
from ..firebase_auth import verify_firebase_token
from ..repositories.user_repository import UserRepository
from ..services.auth_service import AuthService


def get_current_app_user(
    firebase_user=Depends(verify_firebase_token),
    db: Session = Depends(get_db),
):
    service = AuthService(UserRepository(db))
    return service.sync_firebase_user(firebase_user)
