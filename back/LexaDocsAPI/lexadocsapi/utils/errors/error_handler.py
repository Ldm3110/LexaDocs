from fastapi import HTTPException


class ErrorHandler:
    def __init__(self, status_code: int, message: str):
        self.status_code = status_code
        self.message = message

        self.raise_exception()

    def raise_exception(self):
        raise HTTPException(
            status_code=self.status_code,
            headers={"WWW-Authenticate": "Bearer"},
            detail=self.message,
        )
