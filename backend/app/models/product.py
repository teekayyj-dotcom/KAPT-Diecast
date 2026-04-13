from sqlalchemy import JSON, Boolean, Float, String
from sqlalchemy.orm import Mapped, mapped_column

from ..db.base import Base
from .base import TimestampMixin


class Product(TimestampMixin, Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    sku: Mapped[str | None] = mapped_column(String(100), nullable=True, unique=True)
    original_brand: Mapped[str | None] = mapped_column(String(100), nullable=True)
    diecast_brand: Mapped[str | None] = mapped_column(String(100), nullable=True)
    scale: Mapped[str | None] = mapped_column(String(20), nullable=True)
    color: Mapped[str | None] = mapped_column(String(50), nullable=True)
    description: Mapped[str | None] = mapped_column(String(500), nullable=True)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    in_stock: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    main_image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    gallery_image_urls: Mapped[list[str] | None] = mapped_column(JSON, nullable=True)
