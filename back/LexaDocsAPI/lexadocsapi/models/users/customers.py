from enum import Enum
from sqlmodel import Field, Column
from sqlalchemy import Enum as saEnum

from .user import User


class MatrimonialEnum(str, Enum):
    SINGLE = "Célibataire"
    MARRIED = "Marié(e)"
    DIVORCED = "Divorcé(e)"
    WIDOWED = "Veuf/Veuve"
    SEPARATED = "Séparé/e"
    PACS = "Pacsé/e"


class CustomersBase(User):
    matrimonial_status: MatrimonialEnum = Field(
        sa_column=Column(saEnum(MatrimonialEnum), name="matrimonial_status")
    )
    nb_childs: int


class Customers(CustomersBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    password: str


class CustomerCreation(CustomersBase):
    pass
