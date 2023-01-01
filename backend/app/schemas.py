from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional

#######################
# --- User Schemas ---#
#######################


class UserBase(BaseModel):
    username: str
    password: str
    created_at: datetime
    is_active: datetime

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    id: Optional[str]
    fname: str
    lname: str
    email: EmailStr
    username: str
    password: str


class UserOut(BaseModel):
    id: str
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


#######################
# --- Login Schemas ---#
#######################


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[str] = None


########################
# --- Course Schemas ---#
########################


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


##############################
# --- Notice Board Schemas ---#
##############################


class BoardBase(BaseModel):
    pdf_path = str
    country = str
    state = str
    city = str

    class Config:
        orm_mode = True


#######################
# --- Form Schemas ---#
#######################


class FormBase(BaseModel):
    user_id: str
    form_id: int

    class Config:
        orm_mode = True


class FormCreate(FormBase):
    pass


class FormOut(FormBase):
    created_at: datetime

    class Config:
        orm_mode = True


class FormDelete(FormBase):
    pass


class FormUpdate(BaseModel):
    pass
