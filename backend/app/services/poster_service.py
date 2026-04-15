from ..models.poster import Poster
from ..repositories.poster_repository import PosterRepository
from ..schemas.poster import PosterCreate, PosterUpdate

class PosterService:
    def __init__(self, repository: PosterRepository):
        self.repository = repository

    def list_posters(self):
        return self.repository.list()

    def get_poster(self, poster_id: int):
        return self.repository.get_by_id(poster_id)

    def create_poster(self, payload: PosterCreate):
        poster = Poster(**payload.model_dump())
        return self.repository.create(poster)

    def update_poster(self, poster_id: int, payload: PosterUpdate):
        poster = self.repository.get_by_id(poster_id)
        if not poster:
            return None

        update_data = payload.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(poster, field, value)

        return self.repository.update(poster)

    def delete_poster(self, poster_id: int):
        poster = self.repository.get_by_id(poster_id)
        if not poster:
            return False
        self.repository.delete(poster)
        return True
