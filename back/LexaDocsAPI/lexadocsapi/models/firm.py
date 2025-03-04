from sqlmodel import Field, SQLModel


class Firm(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    logo_url: str | None = Field(default=None)
    address: str | None = Field(default=None)
