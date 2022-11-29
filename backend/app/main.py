from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models, schemas
from .database import engine
from .routers import user, course, auth, checkout

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["http://localhost", "https://m.stripe.com"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(course.router)
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(checkout.router)
