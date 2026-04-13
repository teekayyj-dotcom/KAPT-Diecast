from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

from .db_session import Base, engine, get_db
from .firebase_auth import verify_firebase_token
from .product_models import Product
from .product_schemas import ProductCreate, ProductResponse


app = FastAPI(title="Kapt Diecast FastAPI")

# Tao bang tu dong cho demo/local development.
Base.metadata.create_all(bind=engine)


@app.get("/")
def read_root():
    return {"message": "FastAPI + MySQL is running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/me")
def get_current_user(user=Depends(verify_firebase_token)):
    return {
        "uid": user["uid"],
        "email": user["email"],
        "name": user["name"],
    }


@app.get("/products", response_model=list[ProductResponse])
def list_products(db: Session = Depends(get_db)):
    return db.query(Product).all()


@app.post("/products", response_model=ProductResponse)
def create_product(payload: ProductCreate, db: Session = Depends(get_db)):
    product = Product(**payload.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product
