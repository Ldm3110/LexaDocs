from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from lexadocsapi.database import get_session
from sqlmodel import Session, select
from starlette import status

from lexadocsapi.auth_config import oauth2_scheme

from lexadocsapi.models.users.staff import Staff, StaffCreation, StaffResponse
from lexadocsapi.auth_config import hash_password

router = APIRouter(prefix="/staff", tags=["staff"])


def http_exception_401(message: str):
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        headers={"WWW-Authenticate": "Bearer"},
        detail=message,
    )


@router.post(
    "/create_admin", response_model=StaffResponse, status_code=status.HTTP_201_CREATED
)
async def create_admin_profile(
    staff_data: StaffCreation,
    authentication: Annotated[str, Depends(oauth2_scheme)],
    session: Session = Depends(get_session),
):
    try:
        hashed_password = hash_password("S3cret1234")
        data_validated = Staff.model_validate(
            {**staff_data.model_dump(), "password": hashed_password}
        )
        session.add(data_validated)
        session.commit()
        session.refresh(data_validated)
        return data_validated
    except Exception as e:
        raise HTTPException(status_code=422, detail={f"Error : {e}"})


@router.delete("/remove_staff", status_code=status.HTTP_204_NO_CONTENT)
async def remove_staff(
    id: str,
    authentication: Annotated[str, Depends(oauth2_scheme)],
    session: Session = Depends(get_session),
):
    staff = session.exec(select(Staff).where(Staff.id == int(id)))

    if not staff:
        http_exception_401(message="User does not exist in database")

    session.delete(staff)
    session.commit()
