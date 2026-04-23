from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from ..models.user import User


class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def list(self, search: str | None = None, role: str | None = None, status: str | None = None) -> list[User]:
        stmt = select(User).order_by(User.id.desc())

        if search:
            like_term = f"%{search}%"
            stmt = stmt.where(or_(User.email.ilike(like_term), User.full_name.ilike(like_term)))
        if role:
            stmt = stmt.where(User.role == role)
        if status:
            stmt = stmt.where(User.status == status)

        return list(self.db.scalars(stmt).all())

    def get_by_id(self, user_id: int) -> User | None:
        return self.db.get(User, user_id)

    def get_by_email(self, email: str) -> User | None:
        stmt = select(User).where(User.email == email)
        return self.db.scalar(stmt)

    def get_by_cognito_sub(self, cognito_sub: str) -> User | None:
        stmt = select(User).where(User.cognito_sub == cognito_sub)
        return self.db.scalar(stmt)

    def get_by_firebase_uid(self, firebase_uid: str) -> User | None:
        stmt = select(User).where(User.firebase_uid == firebase_uid)
        return self.db.scalar(stmt)

    def create(self, user: User) -> User:
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def update(self, user: User) -> User:
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def delete(self, user: User):
        self.db.delete(user)
        self.db.commit()
