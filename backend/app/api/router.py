from fastapi import APIRouter

from .routes.auth import router as auth_router
from .routes.health import router as health_router
from .routes.products import router as products_router
from .routes.users import router as users_router
from .routes.blogs import router as blogs_router
from .routes.posters import router as posters_router
from .routes.orders import router as orders_router

api_router = APIRouter()
api_router.include_router(health_router, tags=["health"])
api_router.include_router(auth_router, tags=["auth"])
api_router.include_router(products_router, prefix="/products", tags=["products"])
api_router.include_router(users_router, prefix="/users", tags=["users"])
api_router.include_router(blogs_router, prefix="/blogs", tags=["blogs"])
api_router.include_router(posters_router, prefix="/posters", tags=["posters"])
api_router.include_router(orders_router, prefix="/orders", tags=["orders"])
