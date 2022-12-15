from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import Optional, List
import ..models, ..schemas, ..utils, ..oauth2
from ..database import engine, get_db
from ..docs import adobe

router = APIRouter(prefix="/forms", tags=["Forms"])

cwd = os.cwd()
parent = os.path.dirname(cwd)
user_files = os.join(parent, "docs")

print(user_files)


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_form(
    form: schemas.FormCreate,
    db: Session = Depends(get_db),
    user: str = Depends(oauth2.get_current_user),
):

    utils.verify_user(form.user_id, user)

    form_query = (
        db.query(models.User_Form)
        .filter(
            models.User_Form.user_id == form.user_id,
            models.User_Form.form_id == form.form_id,
        )
        .first()
    )

    if form_query:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Form already exists.",
        )

    new_form = models.User_Form(**form.dict())
    db.add(new_form)
    db.commit()
    db.refresh(new_form)

    return new_form


# @router.put("/{user_id}")
# def update_form(form: schemas.FormUpdate, user_id: str, db: Session = Depends(get_db)
# user: str = Depends(oauth2.get_current_user),
# ):

# utils.verify_user(user_id, user)

# form_query = (
# db.query(models.User_Form)
# .filter(
# models.User_Form.form_id == form.user_id,
# models.User_Form.user_id == form.form_id,
# )
# .first()
# form_query.update(
# {
# "created_at": created_at,
# }
# )
# db.commit()

# return {
# "detail": f"Form has been successfully updated",
# "user_id": id,
# }


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_form(
    form: schemas.FormUpdate,
    user_id: str,
    db: Session = Depends(get_db),
    user: str = Depends(oauth2.get_current_user),
):
    utils.verify_user(user_id, user)

    form_query = (
        db.query(models.User_Form)
        .filter(
            models.User_Form.form_id == form.user_id,
            models.User_Form.user_id == form.form_id,
        )
        .first()
    )

    for attribute in form:
        form_id = attribute.form_id

    if not form_query.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Form with id: {form_id} does not exist for user with id: {user_id}",
        )

    form_query.delete(synchronize_session=False)
    db.commit()

    return {
        "detail": f"Form: {form_id} has been successfully deleted",
        "form_id": form_id,
    }


@router.get("/{user_id}", response_model=schemas.FormOut)
def get_forms(
    user_id: int,
    db: Session = Depends(get_db),
    user: str = Depends(oauth2.get_current_user),
):
    utils.verify_user(user_id, user)

    form = db.query(models.Form).filter(models.User_Form.user_id == user_id)

    if not form:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Customer with id: {user_id} has no forms",
        )

    return form
