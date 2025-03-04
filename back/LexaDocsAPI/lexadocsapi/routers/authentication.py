from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status
from sqlmodel import Session, select

from lexadocsapi.dataEnv.data_env import ACCESS_TOKEN_EXPIRE_MINUTES
from lexadocsapi.models.users.customers import Customers
from lexadocsapi.auth_config import create_access_token
from lexadocsapi.database import get_session
from lexadocsapi.auth_config import check_password


router = APIRouter(prefix="/authentication", tags=["auth"])


@router.post("/customers", status_code=status.HTTP_200_OK)
async def authenticate_customers(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Session = Depends(get_session),
):
    customer = session.exec(
        select(Customers).where(Customers.email == form_data.username)
    ).first()
    password_verification = check_password(
        hashed_password=customer.password, plain_password=form_data.password
    )
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="customer does not exist in db",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not password_verification:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Bad password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": customer.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
