import logging
from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status
from sqlmodel import Session, select

from lexadocsapi.dataEnv.data_env import ACCESS_TOKEN_EXPIRE_MINUTES
from lexadocsapi.models.users.customers import Customers
from lexadocsapi.auth_config import create_access_token, get_current_user
from lexadocsapi.database import get_session
from lexadocsapi.auth_config import check_password


router = APIRouter(prefix="", tags=["auth"])


def http_exception_401(message: str):
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        headers={"WWW-Authenticate": "Bearer"},
        detail=message,
    )


@router.get("/me", status_code=status.HTTP_200_OK)
async def me(result: dict = Depends(get_current_user)):
    for type, value in result.items():
        if type == "error":
            response = Response(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                content=value
            )
            response.delete_cookie("access_token")
            return response
        elif type == "user":
            return JSONResponse(content={"user": value})


@router.post("/authentication/customers", status_code=status.HTTP_200_OK)
async def login_customers(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Session = Depends(get_session),
):
    customer = session.exec(
        select(Customers).where(Customers.email == form_data.username)
    ).first()
    if not customer:
        http_exception_401(message="customer does not exist in db")

    password_verification = check_password(
        hashed_password=customer.password, plain_password=form_data.password
    )
    if not password_verification:
        http_exception_401(message="Bad password")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": customer.email}, expires_delta=access_token_expires
    )
    response = JSONResponse(
        content={"customer_data": {"name": customer.name, "role": "customer"}}
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        samesite="Lax",
        secure=False,
    )

    return response

@router.post("/logout", status_code=status.HTTP_200_OK)
async def logout(session: Session = Depends(get_session)):
    response = Response()
    response.delete_cookie("access_token")
    return response