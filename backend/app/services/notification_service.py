import logging
from dataclasses import dataclass

import boto3
from botocore.exceptions import BotoCoreError, ClientError

from ..core.config import settings


logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class EmailDeliveryResult:
    sent: bool
    error: str | None = None


def get_ses_client():
    client_kwargs = {
        "region_name": settings.aws_region,
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

    return boto3.client("ses", **client_kwargs)


def send_order_confirmation_email(
    recipient_email: str,
    order_number: str,
    customer_name: str,
    total: float,
    line_items: list[dict],
) -> EmailDeliveryResult:
    item_lines = "\n".join(
        f"- {item['product_name']} x {item['quantity']}: ${item['line_total']:.2f}"
        for item in line_items
    )
    body_text = (
        f"Hello {customer_name},\n\n"
        f"Your order {order_number} has been confirmed successfully.\n"
        "This is a test payment flow, so payment was marked as successful automatically.\n\n"
        f"Items:\n{item_lines}\n\n"
        f"Order total: ${total:.2f}\n\n"
        "Thank you for shopping with KAPT Diecast."
    )

    body_html = (
        f"<html><body><h2>Hello {customer_name},</h2>"
        f"<p>Your order <strong>{order_number}</strong> has been confirmed successfully.</p>"
        "<p>This is a test payment flow, so payment was marked as successful automatically.</p>"
        f"<pre>{item_lines}</pre>"
        f"<p><strong>Order total:</strong> ${total:.2f}</p>"
        "<p>Thank you for shopping with KAPT Diecast.</p>"
        "</body></html>"
    )

    try:
        ses = get_ses_client()
        ses.send_email(
            Source=settings.ses_sender_email,
            Destination={"ToAddresses": [recipient_email]},
            Message={
                "Subject": {"Data": f"KAPT Diecast order confirmation - {order_number}"},
                "Body": {
                    "Text": {"Data": body_text},
                    "Html": {"Data": body_html},
                },
            },
        )
        return EmailDeliveryResult(sent=True)
    except ClientError as exc:
        error_code = exc.response.get("Error", {}).get("Code", "ClientError")
        error_message = exc.response.get("Error", {}).get("Message", str(exc))
        logger.exception("Failed to send order confirmation email for %s", order_number)
        return EmailDeliveryResult(sent=False, error=f"{error_code}: {error_message}")
    except BotoCoreError as exc:
        logger.exception("Failed to send order confirmation email for %s", order_number)
        return EmailDeliveryResult(sent=False, error=str(exc))
    except Exception as exc:
        logger.exception("Failed to send order confirmation email for %s", order_number)
        return EmailDeliveryResult(sent=False, error=str(exc))
