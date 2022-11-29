import os
from pydantic import BaseSettings, Field
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    SQLALCHEMY_DATABASE_URL: str = "postgresql://andrew@localhost/test"
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTE = 30


settings = Settings()
