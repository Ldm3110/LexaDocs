import jwt
from lexadocsapi.dataEnv.data_env import ALGORITHM, SECRET_KEY
import pytest
from datetime import datetime, UTC, timedelta

from fastapi.testclient import TestClient
from sqlmodel import Session
from starlette import status

from lexadocsapi.auth_config import hash_password
from lexadocsapi.models.users.customers import Customers


@pytest.fixture
def fake_customer(session: Session):
    hashed_password = hash_password("S3cret1234")
    fake_customer = Customers(
        name="Toto",
        gender="Monsieur",
        address="123 Fake Street, Testville, TX 99999",
        email="toto@tata.org",
        matrimonial_status="Célibataire",
        nb_childs=0,
        password=hashed_password,
    )

    session.add(fake_customer)
    session.commit()
    session.refresh(fake_customer)

    return fake_customer


def get_access_token(client: TestClient, test_user: Customers) -> str:
    response = client.post(
        "/authentication/customers",
        data={
            "username": test_user.email,
            "password": "S3cret1234",
        },
    )

    assert response.status_code == status.HTTP_200_OK


def create_expired_token():
    expired_payload = {
        "sub": "test_user",
        "exp": datetime.now(UTC) - timedelta(minutes=1),  # Token déjà expiré
    }
    return jwt.encode(expired_payload, SECRET_KEY, algorithm=ALGORITHM)
