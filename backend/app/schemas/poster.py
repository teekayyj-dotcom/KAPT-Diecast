from datetime import datetime
from pydantic import BaseModel, ConfigDict

class PosterBase(BaseModel):
    name: str
    location: str
    status: bool = True

class PosterCreate(PosterBase):
    thumbnail: str | None = None

class PosterUpdate(BaseModel):
    name: str | None = None
    location: str | None = None
    status: bool | None = None
    thumbnail: str | None = None

class PosterResponse(PosterBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    thumbnail: str | None = None
    created_at: datetime
    updated_at: datetime
