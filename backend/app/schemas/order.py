from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class OrderItemPayload(BaseModel):
    product_id: int | None = None
    product_name: str
    sku: str | None = None
    quantity: int = Field(ge=1)
    unit_price: float = Field(ge=0)
    line_total: float = Field(ge=0)
    image_url: str | None = None


class CheckoutPayload(BaseModel):
    first_name: str
    last_name: str
    company_name: str | None = None
    country: str
    street_address: str
    apartment: str | None = None
    city: str
    postcode: str | None = None
    phone: str
    email: EmailStr
    notes: str | None = None
    subtotal: float = Field(ge=0)
    shipping_fee: float = Field(ge=0)
    total: float = Field(ge=0)
    items: list[OrderItemPayload] = Field(default_factory=list, min_length=1)


class OrderItemResponse(OrderItemPayload):
    model_config = ConfigDict(from_attributes=True)

    id: int


class OrderResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    order_number: str
    first_name: str
    last_name: str
    company_name: str | None = None
    country: str
    street_address: str
    apartment: str | None = None
    city: str
    postcode: str | None = None
    phone: str
    email: EmailStr
    notes: str | None = None
    subtotal: float
    shipping_fee: float
    total: float
    payment_method: str
    payment_status: str
    order_status: str
    items: list[OrderItemResponse]
    created_at: datetime
    updated_at: datetime
