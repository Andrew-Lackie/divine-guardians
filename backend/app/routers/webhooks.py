import os
import stripe
from fastapi import (
    FastAPI,
    Response,
    Request,
    status,
    HTTPException,
    Depends,
    APIRouter,
    Header,
)
from sqlalchemy.orm import Session
from typing import Optional, List
from .. import models, schemas, utils
from ..database import engine, get_db

router = APIRouter(tags=["Webhooks"])


@router.post("/stripe_webhooks")
async def webhook(
    request: Request, stripe_signature: str = Header(str), db: Session = Depends(get_db)
):
    webhook_secret = os.environ["STRIPE_WEBHOOK_SECRET"]
    data = await request.body()

    try:
        event = stripe.Webhook.construct_event(
            payload=data, sig_header=stripe_signature, secret=webhook_secret
        )
    except ValueError as e:
        # Invalid payload
        raise e
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        raise e
    event_type = event["type"]
    if event_type == "charge.succeeded":
        print("charge.succeeded")
    elif event_type == "invoice.paid":
        print("invoice paid")
    elif event_type == "checkout.session.completed":
        print("checkout session completed")
        id = event["data"]["object"]["customer"]
        membership = event["data"]["object"]["metadata"]["membership"]
        user_query = db.query(models.User).filter(models.User.id == id)
        user_query.update(
            {
                "membership": membership,
            }
        )
        db.commit()

    else:
        print(f"unhanded event: {event_type}")

        return {"status": "success"}
