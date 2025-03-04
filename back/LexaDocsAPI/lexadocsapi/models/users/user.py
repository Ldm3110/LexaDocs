from enum import Enum

from sqlalchemy import Enum as saEnum
from sqlmodel import SQLModel, Field, Column
from pydantic import field_validator
import phonenumbers


class GenderEnum(str, Enum):
    MALE = "Homme"
    FEMALE = "Femme"


class User(SQLModel, table=False):
    gender: GenderEnum = Field(sa_column=Column(saEnum(GenderEnum), name="gender_enum"))
    name: str = Field(index=True)
    address: str
    phone_number: str | None = Field(default=None)
    email: str
    # firm -> Faire une relation vers la class Firm

    @field_validator("phone_number", mode="before")
    def validate_phone(cls, value, info):
        country = info.data.get("country_code", "FR")
        try:
            parsed_number = phonenumbers.parse(value, country)
            if not phonenumbers.is_valid_number(parsed_number):
                raise ValueError("Phone number not valid")
            return phonenumbers.format_number(
                parsed_number, phonenumbers.PhoneNumberFormat.E164
            )
        except phonenumbers.NumberParseException:
            raise ValueError("Phone number format not valid")
