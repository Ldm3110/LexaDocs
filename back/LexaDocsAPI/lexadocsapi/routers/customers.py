import secrets
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from lexadocsapi.utils.errors.error_handler import ErrorHandler
from sqlmodel import Session, select
from starlette import status

from lexadocsapi.auth_config import oauth2_scheme
from lexadocsapi.database import get_session
from lexadocsapi.models.users.customers import Customers, CustomerCreation
from lexadocsapi.auth_config import hash_password

router = APIRouter(prefix="/customers", tags=["customers"])


@router.post("/create", response_model=Customers, status_code=status.HTTP_201_CREATED)
async def create_customer(
    customer: CustomerCreation,
    authentication: Annotated[str, Depends(oauth2_scheme)],
    session: Session = Depends(get_session),
):
    try:
        # hashed_password = hash_password(secrets.token_urlsafe(12))
        hashed_password = hash_password("S3cret1234")
        customer_data = Customers.model_validate(
            {**customer.model_dump(), "password": hashed_password}
        )
        session.add(customer_data)
        session.commit()
        session.refresh(customer_data)
        return customer_data
    except Exception as e:
        ErrorHandler(status_code=422, message=f"Error : {e}")


@router.get("/get_all", response_model=list[Customers], status_code=status.HTTP_200_OK)
async def get_all_customers(
    authentication: Annotated[str, Depends(oauth2_scheme)],
    session: Session = Depends(get_session),
):
    customers = session.exec(select(Customers)).all()

    return customers
