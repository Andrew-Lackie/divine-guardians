from sqlalchemy import ForeignKey, Column, Integer, Float, String, Boolean
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship
from .database import Base


class User_Course(Base):
    __tablename__ = "users_courses"
    user_id = Column(ForeignKey("users.id"), primary_key=True)
    course_id = Column(ForeignKey("courses.id"), primary_key=True)
    courses = relationship("Course")


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key="True", nullable=False)
    fname = Column(String, nullable=False)
    lname = Column(String, nullable=False)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    membership = Column(String, default="basic", nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
    courses = relationship("User_Course")
    addresses = relationship("User_Address", back_populates="users")


class User_Address(Base):
    __tablename__ = "user_addresses"

    id = Column(Integer, primary_key="True", nullable=False)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    postal_code = Column(String, nullable=False)
    state = Column(String, nullable=False)
    country = Column(String, nullable=False)
    telephone = Column(String, nullable=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    users = relationship("User", back_populates="addresses")


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key="True", nullable=False)
    name = Column(String, nullable=False)
    price = Column(String, nullable=False)
    pdf = Column(String, nullable=False)
    video = Column(String, nullable=False)
    description = Column(String, nullable=False)
    photo = Column(String, nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )


class Membership(Base):
    __tablename__ = "memberships"

    id = Column(Integer, primary_key="True", nullable=False)
    price = Column(String, nullable=False)
    modules = Column(Integer, nullable=False)
    meetings = Column(Integer, nullable=False)
    vault_price = Column(Float, nullable=False)
    discount = Column(Integer, nullable=False)
