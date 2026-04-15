from datetime import datetime
from sqlalchemy import String, Text, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from ..db.base import Base
from .base import TimestampMixin


class Blog(TimestampMixin, Base):
    __tablename__ = "blogs"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    slug: Mapped[str] = mapped_column(String(255), nullable=False, unique=True, index=True)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    post_type: Mapped[str] = mapped_column(String(50), nullable=False, default="blog")
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="draft")
    featured_image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    published_date: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
