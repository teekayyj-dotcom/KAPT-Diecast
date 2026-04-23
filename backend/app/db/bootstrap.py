from sqlalchemy import inspect, text

from ..core.config import settings
from ..core.security import ACTIVE_STATUS, ADMIN_ROLE
from ..models import Base
from ..models.user import User
from .session import SessionLocal


def ensure_legacy_tables_are_compatible(db):
    inspector = inspect(db.bind)

    if "products" in inspector.get_table_names():
        product_columns = {column["name"] for column in inspector.get_columns("products")}
        if "created_at" not in product_columns:
            db.execute(
                text(
                    "ALTER TABLE products "
                    "ADD COLUMN created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP"
                )
            )
        if "updated_at" not in product_columns:
            db.execute(
                text(
                    "ALTER TABLE products "
                    "ADD COLUMN updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP "
                    "ON UPDATE CURRENT_TIMESTAMP"
                )
            )
        if "sku" not in product_columns:
            db.execute(text("ALTER TABLE products ADD COLUMN sku VARCHAR(100) NULL UNIQUE"))
        if "original_brand" not in product_columns:
            db.execute(text("ALTER TABLE products ADD COLUMN original_brand VARCHAR(100) NULL"))
        if "diecast_brand" not in product_columns:
            db.execute(text("ALTER TABLE products ADD COLUMN diecast_brand VARCHAR(100) NULL"))
        if "scale" not in product_columns:
            db.execute(text("ALTER TABLE products ADD COLUMN scale VARCHAR(20) NULL"))
        if "color" not in product_columns:
            db.execute(text("ALTER TABLE products ADD COLUMN color VARCHAR(50) NULL"))
        if "in_stock" not in product_columns:
            db.execute(text("ALTER TABLE products ADD COLUMN in_stock BOOLEAN NOT NULL DEFAULT TRUE"))
        if "main_image_url" not in product_columns:
            db.execute(text("ALTER TABLE products ADD COLUMN main_image_url VARCHAR(500) NULL"))
        if "gallery_image_urls" not in product_columns:
            db.execute(text("ALTER TABLE products ADD COLUMN gallery_image_urls JSON NULL"))
        db.commit()


def bootstrap_default_data():
    db = SessionLocal()
    try:
        Base.metadata.create_all(bind=db.bind)
        ensure_legacy_tables_are_compatible(db)
        admin_email = settings.bootstrap_admin_email.lower()
        admin_user = db.query(User).filter(User.email == admin_email).first()

        if not admin_user:
            admin_user = User(
                email=admin_email,
                full_name="System Admin",
                role=ADMIN_ROLE,
                status=ACTIVE_STATUS,
            )
            db.add(admin_user)
            db.commit()
            db.refresh(admin_user)
        elif admin_user.role != ADMIN_ROLE:
            admin_user.role = ADMIN_ROLE
            db.add(admin_user)
            db.commit()
    finally:
        db.close()
