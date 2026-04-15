from sqlalchemy import select
from sqlalchemy.orm import Session

from ..models.blog import Blog


class BlogRepository:
    def __init__(self, db: Session):
        self.db = db

    def list(self, search: str | None = None) -> list[Blog]:
        stmt = select(Blog).order_by(Blog.id.desc())
        if search:
            stmt = stmt.where(Blog.title.ilike(f"%{search}%"))
        return list(self.db.scalars(stmt).all())

    def get_by_id(self, blog_id: int) -> Blog | None:
        return self.db.get(Blog, blog_id)

    def create(self, blog: Blog) -> Blog:
        self.db.add(blog)
        self.db.commit()
        self.db.refresh(blog)
        return blog

    def update(self, blog: Blog) -> Blog:
        self.db.add(blog)
        self.db.commit()
        self.db.refresh(blog)
        return blog

    def delete(self, blog: Blog):
        self.db.delete(blog)
        self.db.commit()
