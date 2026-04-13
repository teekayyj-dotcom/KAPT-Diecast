from sqlalchemy import select
from sqlalchemy.orm import Session

from ..models.product import Product


class ProductRepository:
    def __init__(self, db: Session):
        self.db = db

    def list(self, search: str | None = None) -> list[Product]:
        stmt = select(Product).order_by(Product.id.desc())
        if search:
            stmt = stmt.where(Product.name.ilike(f"%{search}%"))
        return list(self.db.scalars(stmt).all())

    def get_by_id(self, product_id: int) -> Product | None:
        return self.db.get(Product, product_id)

    def create(self, product: Product) -> Product:
        self.db.add(product)
        self.db.commit()
        self.db.refresh(product)
        return product

    def update(self, product: Product) -> Product:
        self.db.add(product)
        self.db.commit()
        self.db.refresh(product)
        return product

