from typing import Annotated
from sqlmodel import Session
from fastapi import APIRouter, Depends
from starlette import status

from lexadocsapi.auth_config import oauth2_scheme
from lexadocsapi.database import get_session

router = APIRouter(prefix="/firm", tags=["firm"])


@router.get("/all", status_code=status.HTTP_200_OK)
async def get_all_firn(
    authentication: Annotated[str, Depends(oauth2_scheme)],
    session: Session = Depends(get_session),
):
    pass


@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_firm(
    authentication: Annotated[str, Depends(oauth2_scheme)],
    session: Session = Depends(get_session),
):
    pass
