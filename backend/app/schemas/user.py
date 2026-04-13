from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr

from ..core.security import ACTIVE_STATUS, CUSTOMER_ROLE


class UserBase(BaseModel):
    email: EmailStr
    full_name: str | None = None
    role: str = CUSTOMER_ROLE
    status: str = ACTIVE_STATUS


class UserCreate(UserBase):
    firebase_uid: str | None = None


class UserUpdate(BaseModel):
    full_name: str | None = None
    role: str | None = None
    status: str | None = None
    firebase_uid: str | None = None


class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    firebase_uid: str | None = None
    created_at: datetime
    updated_at: datetime

