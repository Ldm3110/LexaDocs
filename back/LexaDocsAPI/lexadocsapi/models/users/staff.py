from enum import Enum
from pydantic_core.core_schema import generator_schema
from sqlmodel import Field, Column, SQLModel, table
from pydantic import model_validator
from sqlalchemy import Enum as saEnum

from lexadocsapi.models.users.user import User, GenderEnum


class RoleEnum(str, Enum):
    LAWYER = "Avocat"
    ASSISTANT = "Assistant"
    ADMIN = "Admin"


class StaffBase(User):
    gender: GenderEnum = Field(sa_column=Column(saEnum(GenderEnum), name="gender_enum"))
    role: RoleEnum = Field(sa_column=Column(saEnum(RoleEnum), name="role"))
    username: str | None = Field(default=None)

    @model_validator(mode="after")
    def set_username(self):
        if not self.username:
            self.username = self.generate_username()
        return self

    def generate_username(self) -> str:
        """
        Generate an automatic username like this form :
        {first_letter_first_name}.{surname}
        """
        split_name = self.name.split()
        return f"{split_name[0][0]}{split_name[1]}"


class Staff(StaffBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    password: str


class StaffCreation(StaffBase):
    pass


class StaffResponse(SQLModel):
    id: int
    username: str
    gender: GenderEnum
    name: str
    role: RoleEnum
    email: str
