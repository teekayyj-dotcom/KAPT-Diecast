from ..models.blog import Blog
from ..repositories.blog_repository import BlogRepository
from ..schemas.blog import BlogCreate, BlogUpdate


class BlogService:
    def __init__(self, repository: BlogRepository):
        self.repository = repository

    def list_blogs(self, search: str | None = None):
        return self.repository.list(search=search)

    def get_blog(self, blog_id: int):
        return self.repository.get_by_id(blog_id)

    def create_blog(self, payload: BlogCreate):
        blog = Blog(**payload.model_dump())
        return self.repository.create(blog)

    def update_blog(self, blog_id: int, payload: BlogUpdate):
        blog = self.repository.get_by_id(blog_id)
        if not blog:
            return None

        # exclude_unset avoids overwriting with Nones incorrectly for omitted optional fields
        for field, value in payload.model_dump(exclude_unset=True).items():
            setattr(blog, field, value)

        return self.repository.update(blog)

    def delete_blog(self, blog_id: int):
        blog = self.repository.get_by_id(blog_id)
        if not blog:
            return False
        self.repository.delete(blog)
        return True
