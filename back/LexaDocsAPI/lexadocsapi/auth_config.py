from datetime import datetime, timedelta, timezone

import jwt
from passlib.context import CryptContext

from fastapi.security import OAuth2PasswordBearer

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
