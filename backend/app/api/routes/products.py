from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, Query, Request, UploadFile, status
from sqlalchemy.orm import Session

from ...db.session import get_db
from ...repositories.product_repository import ProductRepository
from ...schemas.product import ProductCreate, ProductResponse, ProductUpdate
from ...services.product_service import ProductService
from ...utils.storage import upload_to_s3


router = APIRouter()


def get_product_service(db: Session = Depends(get_db)) -> ProductService:
    return ProductService(ProductRepository(db))


@router.get("", response_model=list[ProductResponse])
def list_products(
    q: str | None = Query(default=None),
    service: ProductService = Depends(get_product_service),
):
    return service.list_products(search=q)


@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(
    payload: ProductCreate,
    service: ProductService = Depends(get_product_service),
):
    return service.create_product(payload)


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(
    product_id: int,
    service: ProductService = Depends(get_product_service),
):
    product = service.get_product(product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


@router.patch("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    payload: ProductUpdate,
    service: ProductService = Depends(get_product_service),
):
    product = service.update_product(product_id, payload)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


@router.post("/{product_id}/images", response_model=ProductResponse)
def upload_product_images(
    product_id: int,
    request: Request,
    main_image: UploadFile | None = File(default=None),
    gallery_images: list[UploadFile] | None = File(default=None),
    service: ProductService = Depends(get_product_service),
):
    product = service.get_product(product_id)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    main_image_url = product.main_image_url
    gallery_image_urls = list(product.gallery_image_urls or [])

    try:
        if main_image:
            main_image_url = upload_to_s3(main_image, f"products/{product_id}/main")

        if gallery_images:
            gallery_image_urls = []
            for image in gallery_images:
                gallery_image_urls.append(upload_to_s3(image, f"products/{product_id}/gallery"))
    except RuntimeError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=str(exc),
        ) from exc

    updated_product = service.update_product(
        product_id,
        ProductUpdate(
            main_image_url=main_image_url,
            gallery_image_urls=gallery_image_urls or None,
        ),
    )
    return updated_product

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(
    product_id: int,
    service: ProductService = Depends(get_product_service),
):
    success = service.delete_product(product_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
