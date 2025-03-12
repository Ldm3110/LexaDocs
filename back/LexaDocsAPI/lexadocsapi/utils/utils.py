import json

from fastapi import Depends, Response
from starlette import status

from lexadocsapi.auth_config import get_current_user


def auth_validation(auth: dict = Depends(get_current_user)):
    if "error" in auth:
        response = Response(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content=json.dumps(auth),
        )
        response.delete_cookie("access_token")
        return response
    return auth
