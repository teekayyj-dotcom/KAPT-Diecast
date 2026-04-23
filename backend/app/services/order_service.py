import uuid

from ..models.order import Order
from ..models.order_item import OrderItem
from ..repositories.order_repository import OrderRepository
from ..schemas.order import CheckoutOrderResponse, CheckoutPayload
from .notification_service import send_order_confirmation_email


class OrderService:
    def __init__(self, repository: OrderRepository):
        self.repository = repository

    def create_checkout_order(self, payload: CheckoutPayload) -> CheckoutOrderResponse:
        order = Order(
            order_number=f"KAPT-{uuid.uuid4().hex[:10].upper()}",
            first_name=payload.first_name,
            last_name=payload.last_name,
            company_name=payload.company_name,
            country=payload.country,
            street_address=payload.street_address,
            apartment=payload.apartment,
            city=payload.city,
            postcode=payload.postcode,
            phone=payload.phone,
            email=str(payload.email),
            notes=payload.notes,
            subtotal=payload.subtotal,
            shipping_fee=payload.shipping_fee,
            total=payload.total,
            payment_method="test-payment",
            payment_status="paid",
            order_status="confirmed",
            items=[
                OrderItem(
                    product_id=item.product_id,
                    product_name=item.product_name,
                    sku=item.sku,
                    quantity=item.quantity,
                    unit_price=item.unit_price,
                    line_total=item.line_total,
                    image_url=item.image_url,
                )
                for item in payload.items
            ],
        )

        created_order = self.repository.create(order)
        email_result = send_order_confirmation_email(
            recipient_email=created_order.email,
            order_number=created_order.order_number,
            customer_name=f"{created_order.first_name} {created_order.last_name}".strip(),
            total=created_order.total,
            line_items=[
                {
                    "product_name": item.product_name,
                    "quantity": item.quantity,
                    "line_total": item.line_total,
                }
                for item in created_order.items
            ],
        )
        return CheckoutOrderResponse(
            order=created_order,
            email_sent=email_result.sent,
            email_error=email_result.error,
        )
