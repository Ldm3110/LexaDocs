import logging
from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from lexadocsapi.utils.errors.error_handler import ErrorHandler
from lexadocsapi.utils.utils import auth_validation
from starlette import status
from sqlmodel import Session, select

from lexadocsapi.dataEnv.data_env import ACCESS_TOKEN_EXPIRE_MINUTES
from lexadocsapi.models.users.customers import Customers
from lexadocsapi.models.users.staff import Staff
from lexadocsapi.auth_config import create_access_token, get_current_user
from lexadocsapi.database import get_session
from lexadocsapi.auth_config import check_password


router = APIRouter(prefix="", tags=["auth"])


def check_authentication(user, password, role):
    print(user)
    password_verification = check_password(
        hashed_password=user.password, plain_password=password
    )
    if not password_verification:
        ErrorHandler(status_code=401, message="Bad password")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    response = JSONResponse(
        content={"customer_data": {"id": user.id, "name": user.name, "role": role}}
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=False,
        samesite="lax",
        secure=False,
    )

    return response


# @router.get("/me", status_code=status.HTTP_200_OK)
# async def me(result: dict = Depends(auth_validation)):
#     return result


@router.post("/authentication/staff", status_code=status.HTTP_200_OK)
async def login_staff(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Session = Depends(get_session),
):
    staff = session.exec(
        select(Staff).where(Staff.username == form_data.username)
    ).first()
    if not staff:
        ErrorHandler(status_code=401, message="User does not exist")

    response = check_authentication(
        user=staff, password=form_data.password, role=staff.role
    )

    return response


@router.post("/authentication/customers", status_code=status.HTTP_200_OK)
async def login_customers(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Session = Depends(get_session),
):
    customer = session.exec(
        select(Customers).where(Customers.email == form_data.username)
    ).first()
    if not customer:
        ErrorHandler(status_code=401, message="Bad credentials")

    response = check_authentication(
        user=customer, password=form_data.password, role="customer"
    )

    return response


@router.post("/logout", status_code=status.HTTP_200_OK)
async def logout(session: Session = Depends(get_session)):
    response = Response()
    response.delete_cookie("access_token")
    return response
