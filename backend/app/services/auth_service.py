from ..core.config import settings
from ..core.security import ADMIN_ROLE, ACTIVE_STATUS, CUSTOMER_ROLE
from ..models.user import User
from ..repositories.user_repository import UserRepository


class AuthService:
    def __init__(self, repository: UserRepository):
        self.repository = repository

    def sync_firebase_user(self, firebase_user: dict):
        firebase_uid = firebase_user.get("uid")
        email = (firebase_user.get("email") or "").lower()
        full_name = firebase_user.get("name")

        user = None
        if firebase_uid:
            user = self.repository.get_by_firebase_uid(firebase_uid)
        if not user and email:
            user = self.repository.get_by_email(email)

        expected_role = ADMIN_ROLE if email == settings.bootstrap_admin_email.lower() else CUSTOMER_ROLE

        if not user:
            user = User(
                firebase_uid=firebase_uid,
                email=email,
                full_name=full_name,
                role=expected_role,
                status=ACTIVE_STATUS,
            )
            return self.repository.create(user)

        user.firebase_uid = firebase_uid or user.firebase_uid
        user.email = email or user.email
        user.full_name = full_name or user.full_name
        if user.email == settings.bootstrap_admin_email.lower():
            user.role = ADMIN_ROLE

        return self.repository.update(user)

