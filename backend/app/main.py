from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.router import api_router
from .core.config import settings
from .db.base import Base
from .db.bootstrap import bootstrap_default_data
from .db.session import engine
from .models import Product, User, Blog, Poster, Order, OrderItem


app = FastAPI(title=settings.app_name, version=settings.app_version)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
bootstrap_default_data() 
app.include_router(api_router)
