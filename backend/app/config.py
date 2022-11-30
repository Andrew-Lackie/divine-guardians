import os
from pydantic import BaseSettings, Field
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTE = 30


settings = Settings()
