from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ...core.dependencies import get_current_app_user
from ...db.session import get_db
from ...schemas.user import UserResponse


router = APIRouter()


@router.get("/me", response_model=UserResponse)
@router.get("/auth/me", response_model=UserResponse, include_in_schema=False)
def get_my_profile(
    current_user=Depends(get_current_app_user),
):
    return current_user
