from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from ..core.security import ACTIVE_STATUS, CUSTOMER_ROLE
from ..db.base import Base
from .base import TimestampMixin


class User(TimestampMixin, Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    firebase_uid: Mapped[str | None] = mapped_column(String(128), unique=True, nullable=True, index=True)
    cognito_sub: Mapped[str | None] = mapped_column(String(128), unique=True, nullable=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    full_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    role: Mapped[str] = mapped_column(String(50), nullable=False, default=CUSTOMER_ROLE)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default=ACTIVE_STATUS)
