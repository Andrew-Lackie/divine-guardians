import stripe
from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import Optional, List
from .. import models, schemas, utils
from ..database import engine, get_db

router = APIRouter(prefix="/users", tags=["Users"])

stripe.api_key = "STRIPE_KEY"


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    email = db.query(models.User).filter(models.User.email == user.email).first()

    if email:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Email already registered",
        )
    else:

        def createUserStripe(email):
            customer_object = stripe.Customer.create(email=email)
            return customer_object.id

        user_id = createUserStripe(user.email)
        user.id = user_id

        # hash the password
        hashed_password = utils.hash(user.password)
        user.password = hashed_password

        new_user = models.User(**user.dict())
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

    return new_user


@router.get("/{id}", response_model=schemas.UserOut)
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id: {id} does not exist",
        )

    return user


@router.put("/{id}")
def update_user(user: schemas.UserUpdate, id: str, db: Session = Depends(get_db)):
    user_query = db.query(models.User).filter(models.User.id == id)
    for attribute in user_query:
        fname = attribute.fname
        lname = attribute.lname
        email = attribute.email
        address = attribute.address
        membership = attribute.membership
        password = attribute.password
        created_at = attribute.created_at

    if not user_query.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id: {id} does not exist",
        )

    if user.fname != None:
        fname = user.fname

    if user.lname != None:
        lname = user.lname

    if user.email != None:
        email = user.email

    if user.address != None:
        address = user.address

    if user.membership != None:
        membership = user.membership

    if user.password != None:
        password = user.password

    stripe.Customer.modify(id, email=email)

    user_query.update(
        {
            "id": id,
            "fname": fname,
            "lname": lname,
            "email": email,
            "address": address,
            "membership": membership,
            "password": password,
            "created_at": created_at,
        }
    )
    db.commit()

    return {
        "detail": f"User has been successfully updated",
        "user_id": id,
    }


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(id: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id)
    for attribute in user:
        user_name = attribute.fname
        user_id = attribute.id

    if not user.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"user with id: {id} does not exist",
        )

    stripe.Customer.delete(id)
    user.delete(synchronize_session=False)
    db.commit()

    return {
        "detail": f"User: {user_name} has been successfully deleted",
        "user_id": user_id,
    }
