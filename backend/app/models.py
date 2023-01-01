from sqlalchemy import (
    ForeignKey,
    Column,
    Integer,
    Date,
    DateTime,
    Float,
    String,
    Boolean,
    Table,
)
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from .database import Base

# ------------------#
# ------ USER ------#
# ------------------#


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key="True", nullable=False)
    fname = Column(String, nullable=False)
    lname = Column(String, nullable=False)
    username = Column(String, nullable=False)
    company = Column(String, nullable=True)
    title = Column(String, nullable=True)
    dob = Column(Date, nullable=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    membership = Column(String, default="basic", nullable=False)
    affiliate = Column(Integer, default=0, nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
    addresses = relationship("User_Address", back_populates="users")
    courses = relationship("User_Course", back_populates="users")
    forms = relationship("User_Form", back_populates="users")


class User_Address(Base):
    __tablename__ = "user_addresses"

    id = Column(Integer, primary_key="True", nullable=False)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    postal_code = Column(String, nullable=False)
    state = Column(String, nullable=False)
    country = Column(String, nullable=False)
    telephone = Column(String, nullable=False)
    fax = Column(String, nullable=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    users = relationship("User", back_populates="addresses")


# ----------------------#
# ------ PRODUCTS ------#
# ----------------------#


class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key="True", nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    discount_id = Column(Integer, ForeignKey("discounts.id"), nullable=False)
    price = Column(Float, nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key="True", nullable=False)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    pdf = Column(String, nullable=False)
    video = Column(String, nullable=False)
    description = Column(String, nullable=False)
    photo = Column(String, nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
    users = relationship("User_Course", back_populates="courses")


class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key="True", nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )


class Discount(Base):
    __tablename__ = "discounts"
    id = Column(Integer, primary_key="True", nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    discount_percent = Column(Float, nullable=False)
    active = Column(Boolean, nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )


class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key="True", nullable=False)
    status = Column(Boolean, nullable=False)
    product = Column(Integer, ForeignKey("products.id"), nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )


# -------------------#
# ------ FORMS ------#
# -------------------#


class Form(Base):
    __tablename__ = "forms"

    id = Column(Integer, primary_key="True", nullable=False)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
    users = relationship("User_Form", back_populates="forms")


# ---------------------------------#
# ------ PUBLIC NOTICE BOARD ------#
# ---------------------------------#


class Notice(Base):
    __tablename__ = "notices"

    id = Column(Integer, primary_key="True", nullable=False)
    user = Column(String, ForeignKey("users.id"), nullable=False)


# -------------------------#
# ------ ASSOCIATION ------#
# -------------------------#


class User_Course(Base):
    __tablename__ = "user_course"
    user_id = Column(String, ForeignKey("users.id"), primary_key=True)
    course_id = Column(Integer, ForeignKey("courses.id"), primary_key=True)
    courses = relationship("Course", back_populates="users")
    users = relationship("User", back_populates="courses")


class User_Form(Base):
    __tablename__ = "user_form"

    user_id = Column(String, ForeignKey("users.id"), primary_key=True)
    form_id = Column(Integer, ForeignKey("forms.id"), primary_key=True)
    forms = relationship("Form", back_populates="users")
    users = relationship("User", back_populates="forms")
