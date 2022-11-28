from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional

# User Schemas


class UserBase(BaseModel):
    username: str
    password: str
    created_at: datetime
    is_active: datetime

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    fname: str
    lname: str
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime

    class Config:
        orm_mode = True


class UserDelete(UserBase):
    email: EmailStr


class UserUpdate(BaseModel):
    fname: Optional[str] = None
    lname: Optional[str] = None
    email: Optional[EmailStr] = None
    membership: Optional[int] = None
    address: Optional[str] = None
    password: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[str] = None


# Course Schemas


class CourseBase(BaseModel):
    name: str
    price: float

    class Config:
        orm_mode = True


class CourseCreate(CourseBase):
    pass


class CourseUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None


class CourseDelete(CourseBase):
    id: int


class CourseOut(CourseBase):
    id: int

    class Config:
        orm_mode = True
