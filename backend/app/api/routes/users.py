from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from ...db.session import get_db
from ...repositories.user_repository import UserRepository
from ...schemas.user import UserCreate, UserResponse, UserUpdate
from ...services.user_service import UserService


router = APIRouter()


def get_user_service(db: Session = Depends(get_db)) -> UserService:
    return UserService(UserRepository(db))


@router.get("", response_model=list[UserResponse])
def list_users(
    q: str | None = Query(default=None),
    role: str | None = Query(default=None),
    status_filter: str | None = Query(default=None, alias="status"),
    service: UserService = Depends(get_user_service),
):
    return service.list_users(search=q, role=role, status=status_filter)


@router.post("", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(
    payload: UserCreate,
    service: UserService = Depends(get_user_service),
):
    return service.create_user(payload)


@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: int,
    service: UserService = Depends(get_user_service),
):
    user = service.get_user(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


@router.patch("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int,
    payload: UserUpdate,
    service: UserService = Depends(get_user_service),
):
    user = service.update_user(user_id, payload)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: int,
    service: UserService = Depends(get_user_service),
):
    success = service.delete_user(user_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

