from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .api.router import api_router
from .core.config import settings
from .db.base import Base
from .db.bootstrap import bootstrap_default_data
from .db.session import engine
from .models import Product, User
from .utils.storage import ensure_storage_directories


app = FastAPI(title=settings.app_name, version=settings.app_version)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)
ensure_storage_directories()
bootstrap_default_data()
app.mount("/storage", StaticFiles(directory=Path(settings.storage_dir)), name="storage")
app.include_router(api_router)
