import uuid
import boto3
from botocore.exceptions import BotoCoreError, ClientError, NoCredentialsError, PartialCredentialsError
from fastapi import UploadFile

from ..core.config import settings


def get_s3_client():
    client_kwargs = {
        "region_name": settings.aws_region,
        "endpoint_url": settings.aws_endpoint_url,
    }

    access_key = settings.aws_access_key_id
    secret_key = settings.aws_secret_access_key
    has_explicit_credentials = (
        access_key
        and secret_key
        and access_key not in {"REPLACE_ME", "test"}
        and secret_key not in {"REPLACE_ME", "test"}
    )

    if has_explicit_credentials:
        client_kwargs["aws_access_key_id"] = access_key
        client_kwargs["aws_secret_access_key"] = secret_key

    return boto3.client("s3", **client_kwargs)


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
    try:
        s3.put_object(
            Bucket=bucket_name,
            Key=s3_key,
            Body=file_bytes,
            ContentType=upload_file.content_type or "image/jpeg"
        )
    except (NoCredentialsError, PartialCredentialsError) as exc:
        raise RuntimeError(
            "AWS credentials are missing for product image upload. "
            "Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY for the backend runtime."
        ) from exc
    except ClientError as exc:
        error_code = exc.response.get("Error", {}).get("Code", "Unknown")
        raise RuntimeError(
            f"S3 upload failed with AWS error '{error_code}'. "
            "Check the bucket name, IAM permissions, and S3 endpoint configuration."
        ) from exc
    except BotoCoreError as exc:
        raise RuntimeError(
            "S3 upload failed due to an AWS SDK error. Check AWS endpoint and network access."
        ) from exc

    # Return URL (we assume bucket is public or public domain mapping exists)
    # If endpoint URL exists (localstack), use it; else standard AWS logic
    if settings.s3_bucket_domain_name:
        return f"https://{settings.s3_bucket_domain_name}/{s3_key}"
    if settings.aws_endpoint_url:
        return f"{settings.aws_endpoint_url}/{bucket_name}/{s3_key}"
    else:
        return f"https://{bucket_name}.s3.{settings.aws_region}.amazonaws.com/{s3_key}"
