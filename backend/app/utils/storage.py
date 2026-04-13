import os
import shutil
from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile

from ..core.config import settings


def ensure_storage_directories():
    for relative_path in [
        "products",
        "users",
        "blogs",
        "posters",
    ]:
        Path(settings.storage_dir, relative_path).mkdir(parents=True, exist_ok=True)


def save_upload_file(upload_file: UploadFile, destination_dir: Path, prefix: str) -> str:
    destination_dir.mkdir(parents=True, exist_ok=True)
    suffix = Path(upload_file.filename or "").suffix or ".jpg"
    filename = f"{prefix}-{uuid4().hex}{suffix}"
    file_path = destination_dir / filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)

    return filename


def build_product_storage_paths(product_id: int) -> tuple[Path, Path]:
    product_dir = Path(settings.storage_dir) / "products" / str(product_id)
    return product_dir / "main", product_dir / "gallery"

