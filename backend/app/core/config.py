import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    app_name: str = os.getenv("APP_NAME", "Kapt Diecast FastAPI")
    app_version: str = os.getenv("APP_VERSION", "0.1.0")
    mysql_user: str = os.getenv("MYSQL_USER", "ecommerce_user")
    mysql_password: str = os.getenv("MYSQL_PASSWORD", "ecommerce_password")
    mysql_host: str = os.getenv("MYSQL_HOST", "db")
    mysql_port: str = os.getenv("MYSQL_PORT", "3306")
    mysql_database: str = os.getenv("MYSQL_DATABASE", "ecommerce_db")
    google_application_credentials: str = os.getenv(
        "GOOGLE_APPLICATION_CREDENTIALS",
        "/app/credentials/firebase-service-account.json",
    )
    bootstrap_admin_email: str = os.getenv("BOOTSTRAP_ADMIN_EMAIL", "teekayyj@gmail.com")
    storage_dir: str = os.getenv("STORAGE_DIR", "/app/storage")

    @property
    def database_url(self) -> str:
        return (
            f"mysql+pymysql://{self.mysql_user}:{self.mysql_password}"
            f"@{self.mysql_host}:{self.mysql_port}/{self.mysql_database}"
        )


settings = Settings()
