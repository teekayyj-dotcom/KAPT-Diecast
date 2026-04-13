from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ProductBase(BaseModel):
    name: str
    sku: str | None = None
    original_brand: str | None = None
    diecast_brand: str | None = None
    scale: str | None = None
    color: str | None = None
    description: str | None = None
    price: float
    in_stock: bool = True
    main_image_url: str | None = None
    gallery_image_urls: list[str] | None = None


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: str | None = None
    sku: str | None = None
    original_brand: str | None = None
    diecast_brand: str | None = None
    scale: str | None = None
    color: str | None = None
    description: str | None = None
    price: float | None = None
    in_stock: bool | None = None
    main_image_url: str | None = None
    gallery_image_urls: list[str] | None = None


class ProductResponse(ProductBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime
