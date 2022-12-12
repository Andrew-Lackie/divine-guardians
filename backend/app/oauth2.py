import os
from fastapi import status, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from functools import lru_cache
from jose import JWTError, jwt
from datetime import datetime, timedelta
from . import schemas, config
from .config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
SECRET_KEY = os.environ.get("SECRET_KEY")


@lru_cache
def get_settings():
    return Settings()


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTE)
    to_encode.update({"exp": expire})

    SECRET_KEY = os.environ.get("SECRET_KEY")
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=settings.ALGORITHM)

    return encoded_jwt


def verify_access_token(token: str, credentials_exception):
    try:

        payload = jwt.decode(token, SECRET_KEY, algorithms=[settings.ALGORITHM])

        id: str = payload.get("user_id")

        if id is None:
            raise credentials_exceptions
        token_data = schemas.TokenData(id=id)

    except JWTError:
        raise credentials_exception

    return token_data


def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=f"Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    return verify_access_token(token, credentials_exception)
