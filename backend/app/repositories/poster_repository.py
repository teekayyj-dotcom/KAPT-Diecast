from sqlalchemy.orm import Session
from ..models.poster import Poster

class PosterRepository:
    def __init__(self, db: Session):
        self.db = db

    def list(self):
        return self.db.query(Poster).order_by(Poster.created_at.desc()).all()

    def get_by_id(self, poster_id: int):
        return self.db.query(Poster).filter(Poster.id == poster_id).first()

    def create(self, poster: Poster):
        self.db.add(poster)
        self.db.commit()
        self.db.refresh(poster)
        return poster

    def update(self, poster: Poster):
        self.db.commit()
        self.db.refresh(poster)
        return poster

    def delete(self, poster: Poster):
        self.db.delete(poster)
        self.db.commit()
