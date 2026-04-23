from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from ...db.session import get_db
from ...repositories.order_repository import OrderRepository
from ...schemas.order import CheckoutOrderResponse, CheckoutPayload
from ...services.order_service import OrderService


router = APIRouter()


def get_order_service(db: Session = Depends(get_db)) -> OrderService:
    return OrderService(OrderRepository(db))


@router.post("", response_model=CheckoutOrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(
    payload: CheckoutPayload,
    service: OrderService = Depends(get_order_service),
):
    return service.create_checkout_order(payload)
