from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, Query, Request, UploadFile, status
from sqlalchemy.orm import Session

from ...db.session import get_db
from ...repositories.blog_repository import BlogRepository
from ...schemas.blog import BlogCreate, BlogResponse, BlogUpdate
from ...services.blog_service import BlogService
from ...utils.storage import upload_to_s3


router = APIRouter()


def get_blog_service(db: Session = Depends(get_db)) -> BlogService:
    return BlogService(BlogRepository(db))


@router.get("", response_model=list[BlogResponse])
def list_blogs(
    q: str | None = Query(default=None),
    service: BlogService = Depends(get_blog_service),
):
    return service.list_blogs(search=q)


@router.post("", response_model=BlogResponse, status_code=status.HTTP_201_CREATED)
def create_blog(
    payload: BlogCreate,
    service: BlogService = Depends(get_blog_service),
):
    return service.create_blog(payload)


@router.get("/{blog_id}", response_model=BlogResponse)
def get_blog(
    blog_id: int,
    service: BlogService = Depends(get_blog_service),
):
    blog = service.get_blog(blog_id)
    if not blog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found")
    return blog


@router.patch("/{blog_id}", response_model=BlogResponse)
def update_blog(
    blog_id: int,
    payload: BlogUpdate,
    service: BlogService = Depends(get_blog_service),
):
    blog = service.update_blog(blog_id, payload)
    if not blog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found")
    return blog


@router.post("/{blog_id}/image", response_model=BlogResponse)
def upload_blog_image(
    blog_id: int,
    request: Request,
    featured_image: UploadFile = File(...),
    service: BlogService = Depends(get_blog_service),
):
    blog = service.get_blog(blog_id)
    if not blog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found")

    featured_image_url = upload_to_s3(featured_image, f"blogs/{blog_id}/featured")

    updated_blog = service.update_blog(
        blog_id,
        BlogUpdate(
            featured_image_url=featured_image_url,
        ),
    )
    return updated_blog

@router.delete("/{blog_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_blog(
    blog_id: int,
    service: BlogService = Depends(get_blog_service),
):
    success = service.delete_blog(blog_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found")
