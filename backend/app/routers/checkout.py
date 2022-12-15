import os
import stripe
from fastapi import (
    FastAPI,
    Request,
    Response,
    status,
    HTTPException,
    Depends,
    APIRouter,
)
from sqlalchemy.orm import Session
from typing import Optional, List

router = APIRouter(prefix="/create_checkout_session", tags=["Checkout"])

stripe.api_key = os.environ.get("STRIPE_KEY")

# @router.post("/", status_code=status.HTTP_200_OK, response_model=schemas.UserOut)
@router.post("/")
# def create_user(request: request, checkout_session: schemas.UserCreate, db: Session = Depends(get_db)):
async def create_checkout_session(request: Request):
    data = await request.json()
    print(data)
    checkout_session = stripe.checkout.Session.create(
        success_url="http://localhost/dev/professional/divine-guardians/divine-guardians/frontend/pages/success.html?session_id={CHECKOUT_SESSION_ID}",
        cancel_url="http://localhost/dev/professional/divine-guardians/divine-guardians/frontend/pages/cancel.html",
        payment_method_types=["card"],
        mode="subscription",
        customer=data["userId"],
        client_reference_id=data["userId"],
        metadata={"membership": data["membership"]},
        line_items=[{"price": data["priceId"], "quantity": 1}],
    )

    return {"sessionId": checkout_session["id"]}
