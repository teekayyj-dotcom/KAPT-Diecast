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
    redis_host: str | None = os.getenv("REDIS_HOST")
    redis_port: str = os.getenv("REDIS_PORT", "6379")
    google_application_credentials: str = os.getenv(
        "GOOGLE_APPLICATION_CREDENTIALS",
        "/app/credentials/firebase-service-account.json",
    )
    bootstrap_admin_email: str = os.getenv("BOOTSTRAP_ADMIN_EMAIL", "teekayyj@gmail.com")
    # AWS S3 Configure
    aws_access_key_id: str = os.getenv("AWS_ACCESS_KEY_ID", "test")
    aws_secret_access_key: str = os.getenv("AWS_SECRET_ACCESS_KEY", "test")
    aws_region: str = os.getenv("AWS_REGION", "ap-south-1")
    s3_bucket_name: str = os.getenv("S3_BUCKET_NAME", "kapt-diecast")
    s3_bucket_domain_name: str | None = os.getenv("S3_BUCKET_DOMAIN_NAME")
    aws_endpoint_url: str | None = os.getenv("AWS_ENDPOINT_URL", "http://localstack:4566")
    ses_sender_email: str = os.getenv("SES_SENDER_EMAIL", bootstrap_admin_email)

    @property
    def database_url(self) -> str:
        return (
            f"mysql+pymysql://{self.mysql_user}:{self.mysql_password}"
            f"@{self.mysql_host}:{self.mysql_port}/{self.mysql_database}"
        )

    @property
    def redis_url(self) -> str | None:
        if not self.redis_host:
            return None
        return f"redis://{self.redis_host}:{self.redis_port}"


settings = Settings()
