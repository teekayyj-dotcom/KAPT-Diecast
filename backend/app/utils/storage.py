import uuid
import boto3
from fastapi import UploadFile

from ..core.config import settings


def get_s3_client():
    return boto3.client(
        "s3",
        aws_access_key_id=settings.aws_access_key_id,
        aws_secret_access_key=settings.aws_secret_access_key,
        region_name=settings.aws_region,
        endpoint_url=settings.aws_endpoint_url
    )


def upload_to_s3(upload_file: UploadFile, prefix: str) -> str:
    """
    Uploads a FastAPI UploadFile to AWS S3 (or LocalStack) and returns the public URL.
    """
    s3 = get_s3_client()
    bucket_name = settings.s3_bucket_name

    # Determine extension and generate a secure UUID filename
    filename = upload_file.filename or ""
    suffix = ""
    if "." in filename:
        suffix = f".{filename.rsplit('.', 1)[-1]}"
    else:
        suffix = ".jpg"
        
    s3_key = f"{prefix}/{uuid.uuid4().hex}{suffix}"

    # Read bytes from file
    file_bytes = upload_file.file.read()

    # Upload to S3
    s3.put_object(
        Bucket=bucket_name,
        Key=s3_key,
        Body=file_bytes,
        ContentType=upload_file.content_type or "image/jpeg"
    )

    # Return URL (we assume bucket is public or public domain mapping exists)
    # If endpoint URL exists (localstack), use it; else standard AWS logic
    if settings.aws_endpoint_url:
        return f"{settings.aws_endpoint_url}/{bucket_name}/{s3_key}"
    else:
        return f"https://{bucket_name}.s3.{settings.aws_region}.amazonaws.com/{s3_key}"
