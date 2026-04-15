from datetime import datetime
from pydantic import BaseModel, ConfigDict


class BlogBase(BaseModel):
    title: str
    slug: str
    content: str
    post_type: str = "blog"
    status: str = "draft"
    featured_image_url: str | None = None
    published_date: datetime | None = None


class BlogCreate(BlogBase):
    pass


class BlogUpdate(BaseModel):
    title: str | None = None
    slug: str | None = None
    content: str | None = None
    post_type: str | None = None
    status: str | None = None
    featured_image_url: str | None = None
    published_date: datetime | None = None


class BlogResponse(BlogBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime
