from pathlib import Path
from fastapi import APIRouter, Depends, File, HTTPException, Query, Request, UploadFile, status
from sqlalchemy.orm import Session

from ...db.session import get_db
from ...repositories.poster_repository import PosterRepository
from ...schemas.poster import PosterCreate, PosterResponse, PosterUpdate
from ...services.poster_service import PosterService
from ...utils.storage import upload_to_s3

router = APIRouter()

def get_poster_service(db: Session = Depends(get_db)) -> PosterService:
    return PosterService(PosterRepository(db))

@router.get("", response_model=list[PosterResponse])
def list_posters(
    service: PosterService = Depends(get_poster_service),
):
    return service.list_posters()

@router.post("", response_model=PosterResponse, status_code=status.HTTP_201_CREATED)
def create_poster(
    payload: PosterCreate,
    service: PosterService = Depends(get_poster_service),
):
    return service.create_poster(payload)

@router.get("/{poster_id}", response_model=PosterResponse)
def get_poster(
    poster_id: int,
    service: PosterService = Depends(get_poster_service),
):
    poster = service.get_poster(poster_id)
    if not poster:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Poster not found")
    return poster

@router.patch("/{poster_id}", response_model=PosterResponse)
def update_poster(
    poster_id: int,
    payload: PosterUpdate,
    service: PosterService = Depends(get_poster_service),
):
    poster = service.update_poster(poster_id, payload)
    if not poster:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Poster not found")
    return poster

@router.post("/{poster_id}/image", response_model=PosterResponse)
def upload_poster_image(
    poster_id: int,
    request: Request,
    thumbnail: UploadFile = File(...),
    service: PosterService = Depends(get_poster_service),
):
    poster = service.get_poster(poster_id)
    if not poster:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Poster not found")

    thumbnail_url = upload_to_s3(thumbnail, f"posters/{poster_id}")

    updated_poster = service.update_poster(
        poster_id,
        PosterUpdate(
            thumbnail=thumbnail_url,
        ),
    )
    return updated_poster

@router.delete("/{poster_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_poster(
    poster_id: int,
    service: PosterService = Depends(get_poster_service),
):
    success = service.delete_poster(poster_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Poster not found")
    return None
