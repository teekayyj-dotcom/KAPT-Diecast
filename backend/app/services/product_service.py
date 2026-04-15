from ..models.product import Product
from ..repositories.product_repository import ProductRepository
from ..schemas.product import ProductCreate, ProductUpdate


class ProductService:
    def __init__(self, repository: ProductRepository):
        self.repository = repository

    def list_products(self, search: str | None = None):
        return self.repository.list(search=search)

    def get_product(self, product_id: int):
        return self.repository.get_by_id(product_id)

    def create_product(self, payload: ProductCreate):
        product = Product(**payload.model_dump())
        return self.repository.create(product)

    def update_product(self, product_id: int, payload: ProductUpdate):
        product = self.repository.get_by_id(product_id)
        if not product:
            return None

        for field, value in payload.model_dump(exclude_unset=True).items():
            setattr(product, field, value)

        return self.repository.update(product)

    def delete_product(self, product_id: int):
        product = self.repository.get_by_id(product_id)
        if not product:
            return False
        self.repository.delete(product)
        return True

