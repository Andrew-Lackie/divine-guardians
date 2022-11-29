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
from .. import models, schemas, utils
from ..database import engine, get_db

router = APIRouter(prefix="/create_checkout_session", tags=["Checkout"])

stripe.api_key = os.environ.get("STRIPE_KEY")


# @router.post("/", status_code=status.HTTP_200_OK, response_model=schemas.UserOut)
@router.post("/")
# def create_user(request: request, checkout_session: schemas.UserCreate, db: Session = Depends(get_db)):
async def create_checkout_session(request: Request):
    data = await request.json()
    checkout_session = stripe.checkout.Session.create(
        success_url="http://localhost/web_dev/professional/divine-guardians/divine-guardians/frontend/pages/success.html?session_id={CHECKOUT_SESSION_ID}",
        cancel_url="http://localhost/web_dev/professional/divine-guardians/divine-guardians/frontend/pages/cancel.html",
        payment_method_types=["card"],
        mode="subscription",
        line_items=[{"price": data["priceId"], "quantity": 1}],
    )
    # email = db.query(models.User).filter(models.User.email == user.email).first()

    # if email:
    # raise HTTPException(
    # status_code=status.HTTP_409_CONFLICT,
    # detail=f"Email already registered",
    # )

    # hash the password
    # hashed_password = utils.hash(user.password)
    # user.password = hashed_password

    # new_user = models.User(**user.dict())
    # db.add(new_user)
    # db.commit()
    # db.refresh(new_user)

    return {"sessionId": checkout_session["id"]}
