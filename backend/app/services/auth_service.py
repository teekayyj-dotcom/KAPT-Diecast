from ..core.config import settings
from ..core.security import ADMIN_ROLE, ACTIVE_STATUS, CUSTOMER_ROLE
from ..models.user import User
from ..repositories.user_repository import UserRepository


class AuthService:
    def __init__(self, repository: UserRepository):
        self.repository = repository

    def sync_cognito_user(self, cognito_user: dict):
        cognito_sub = cognito_user.get("sub")
        email = (cognito_user.get("email") or "").lower()
        full_name = cognito_user.get("name") or cognito_user.get("username")

        user = None
        if cognito_sub:
            user = self.repository.get_by_cognito_sub(cognito_sub)
        if not user and cognito_sub:
            user = self.repository.get_by_firebase_uid(cognito_sub)
        if not user and email:
            user = self.repository.get_by_email(email)

        expected_role = ADMIN_ROLE if email == settings.bootstrap_admin_email.lower() else CUSTOMER_ROLE

        if not user:
            user = User(
                cognito_sub=cognito_sub,
                email=email,
                full_name=full_name,
                role=expected_role,
                status=ACTIVE_STATUS,
            )
            return self.repository.create(user)

        user.cognito_sub = cognito_sub or user.cognito_sub
        user.email = email or user.email
        user.full_name = full_name or user.full_name
        if user.email == settings.bootstrap_admin_email.lower():
            user.role = ADMIN_ROLE

        return self.repository.update(user)
