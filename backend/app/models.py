from sqlalchemy import ForeignKey, Column, Integer, Float, String, Boolean
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key="True", nullable=False)
    fname = Column(String, nullable=False)
    lname = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    address = Column(String, unique=False, nullable=True)
    password = Column(String, nullable=False)
    membership = Column(String, default="basic", nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), nullable=False, server_default=text("now()")
    )
    courses = relationship("Course", secondary="users_courses")


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
    courses = relationship("User", secondary="users_courses")


class User_Course(Base):
    __tablename__ = "users_courses"

    user_id = Column(String, ForeignKey("users.id"), primary_key="True", nullable=False)
    course_id = Column(
        Integer, ForeignKey("courses.id"), primary_key="True", nullable=False
    )


class Membership(Base):
    __tablename__ = "memberships"

    id = Column(Integer, primary_key="True", nullable=False)
    price = Column(String, nullable=False)
    modules = Column(Integer, nullable=False)
    meetings = Column(Integer, nullable=False)
    vault_price = Column(Float, nullable=False)
    discount = Column(Integer, nullable=False)
