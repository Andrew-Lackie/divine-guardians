import time
from fastapi import FastAPI, Response, status, HTTPException, Depends
from fastapi.params import Body
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
import psycopg
from sqlalchemy.orm import Session
from . import models, schemas, utils
from .database import engine, get_db
from .routers import user, auth

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["http://0.0.0.0:5000", "http://0.0.0.0:5000/pages"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)


while True:

    try:
        with psycopg.connect("dbname=test user=andrew") as conn:
            with conn.cursor() as cur:
                print("Connection to database succeeded.")
                break

    except Exception as error:
        print("Connection to database failed")
        print("Error: ", error)
        time.sleep(5)

app.include_router(user.router)
app.include_router(auth.router)


@app.get("/")
def root():
    return "root"
