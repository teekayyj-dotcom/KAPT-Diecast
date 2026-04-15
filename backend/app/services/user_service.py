from ..models.user import User
from ..repositories.user_repository import UserRepository
from ..schemas.user import UserCreate, UserUpdate


class UserService:
    def __init__(self, repository: UserRepository):
        self.repository = repository

    def list_users(self, search: str | None = None, role: str | None = None, status: str | None = None):
        return self.repository.list(search=search, role=role, status=status)

    def get_user(self, user_id: int):
        return self.repository.get_by_id(user_id)

    def create_user(self, payload: UserCreate):
        user = User(**payload.model_dump())
        return self.repository.create(user)

    def update_user(self, user_id: int, payload: UserUpdate):
        user = self.repository.get_by_id(user_id)
        if not user:
            return None

        for field, value in payload.model_dump(exclude_unset=True).items():
            setattr(user, field, value)

        return self.repository.update(user)

    def delete_user(self, user_id: int):
        user = self.repository.get_by_id(user_id)
        if not user:
            return False
        self.repository.delete(user)
        return True

