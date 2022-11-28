import os
from pydantic import BaseSettings, Field
from dotenv import load_dotenv


class Settings(BaseSettings):
    SQLALCHEMY_DATABASE_URL: str = "postgresql://andrew@localhost/test"
    SECRET_KEY = "Hello"
    ACCESS_TOKEN_EXPIRE_MINUTE = 30

    class Config:
        env_file = ".env"


settings = Settings()
