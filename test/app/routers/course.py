from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import Optional, List
from .. import models, schemas
from ..database import engine, get_db

router = APIRouter(prefix="/courses", tags=["Courses"])


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.CourseOut)
def create_course(course: schemas.CourseCreate, db: Session = Depends(get_db)):
    course_name = (
        db.query(models.Course).filter(models.Course.name == course.name).first()
    )

    if course_name:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Course already exists.",
        )

    new_course = models.Course(**course.dict())
    db.add(new_course)
    db.commit()
    db.refresh(new_course)

    return new_course


@router.put("/{id}")
def update_course(course: schemas.CourseUpdate, id: int, db: Session = Depends(get_db)):
    course_query = db.query(models.Course).filter(models.Course.id == id)
    for attribute in course_query:
        course_name = attribute.name
        course_price = attribute.price
        created_at = attribute.created_at

    if not course_query.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with id: {id} does not exist",
        )

    if course.name == None:
        new_name = course_name
    else:
        new_name = course.name

    if course.price == None:
        new_price = course_price
    else:
        new_price = course.price

    course_query.update(
        {
            "id": id,
            "name": new_name,
            "price": new_price,
            "created_at": created_at,
        }
    )
    db.commit()

    return {
        "detail": f"Course has been successfully updated",
        "course_id": id,
    }


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.id == id)
    for attribute in course:
        course_name = attribute.name
        course_id = attribute.id

    if not course.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with id: {id} does not exist",
        )

    course.delete(synchronize_session=False)
    db.commit()

    return {
        "detail": f"Course: {course_name} has been successfully deleted",
        "course_id": course_id,
    }


@router.get("/{id}", response_model=schemas.CourseOut)
def get_course(id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.id == id).first()

    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Course with id: {id} does not exist",
        )

    return course
