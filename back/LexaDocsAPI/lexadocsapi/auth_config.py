from datetime import datetime, timedelta, timezone

import jwt
from passlib.context import CryptContext

from fastapi import HTTPException, Depends, Response
from fastapi.requests import Request
from fastapi.security import OAuth2PasswordBearer
from starlette import status

from lexadocsapi.dataEnv.data_env import (
    SECRET_KEY,
    ALGORITHM,
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="authentication")
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# password handlers
def hash_password(password: str):
    return password_context.hash(password)


def check_password(hashed_password, plain_password):
    return password_context.verify(plain_password, hashed_password)


# Token
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_token(request: Request):
    """
    return the current token from the cookie if exist
    """
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Token does not exist")

    return token


def get_current_user(token: str = Depends(get_current_token)):
    """
    return the current user to validate the connection state
    """
    response = Response()
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        exp: int = payload.get("exp")
        exp_datetime = datetime.fromtimestamp(exp, tz=timezone.utc)

        if not email:
            raise HTTPException(status_code=401, detail="User not authenticated")
        if exp and datetime.now(timezone.utc) > exp_datetime:
            return {"error": "Token expired"}
        return {"user": email}
    except jwt.ExpiredSignatureError:
        return {"error": "Token expired"}
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
