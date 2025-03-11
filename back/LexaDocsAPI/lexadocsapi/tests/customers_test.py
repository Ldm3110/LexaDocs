import pytest

from sqlmodel import Session
from fastapi.testclient import TestClient
from starlette import status

from lexadocsapi.models.users.customers import Customers
from lexadocsapi.tests.database import session_fixture, client_fixture
from lexadocsapi.auth_config import hash_password


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
    print("=========================")
    print(fake_customer.password)
    print("=========================")

    return fake_customer


def get_access_token(client: TestClient, test_user: Customers) -> str:
    response = client.post(
        "/authentication/customers",
        data={
            "username": test_user.email,
            "password": "S3cret1234",
        },
    )
    print("=========================")
    print(response.json())
    print("=========================")

    assert response.status_code == status.HTTP_200_OK


class TestCustomers:

    def test_get_all_customers(self, client: TestClient, fake_customer: Customers):
        token = get_access_token(client=client, test_user=fake_customer)
        response = client.get(
            "/customers/get_all", headers={"Authorization": f"Bearer {token}"}
        )

        data = response.json()

        assert response.status_code == status.HTTP_200_OK

    def test_create_customer(self, client: TestClient, fake_customer: Customers):
        token = get_access_token(client=client, test_user=fake_customer)
        payload = {
            "name": "John Doe",
            "address": "123 Fake Street, Testville, TX 99999",
            "phone_number": "+33102030405",
            "gender": "Monsieur",
            "email": "johndoe@example.com",
            "matrimonial_status": "Célibataire",
            "nb_childs": 0,
        }

        response = client.post(
            "/customers/create",
            headers={"Authorization": f"Bearer {token}"},
            json=payload,
        )

        data = response.json()

        assert response.status_code == status.HTTP_201_CREATED
        assert data["name"] == "John Doe"
        # check if password is generated and hashed when creating customer
        assert data["password"].startswith("$2b$")

    def test_bad_phone_number(self, client: TestClient, fake_customer: Customers):
        token = get_access_token(client=client, test_user=fake_customer)
        payload = {
            "name": "John Doe",
            "address": "123 Fake Street, Testville, TX 99999",
            "phone_number": "Not a phone number",
            "gender": "Monsieur",
            "email": "johndoe@example.com",
            "matrimonial_status": "Célibataire",
            "nb_childs": 0,
        }

        response = client.post(
            "/customers/create",
            headers={"Authorization": f"Bearer {token}"},
            json=payload,
        )

        data = response.json()

        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    def test_bad_matrimonial_status(self, client: TestClient, fake_customer: Customers):
        token = get_access_token(client=client, test_user=fake_customer)
        payload = payload = {
            "name": "John Doe",
            "address": "123 Fake Street, Testville, TX 99999",
            "phone_number": "+33102030405",
            "gender": "Monsieur",
            "email": "johndoe@example.com",
            "matrimonial_status": "Bad Status",
            "nb_childs": 0,
        }

        response = client.post(
            "customers/create",
            headers={"Authorization": f"Bearer {token}"},
            json=payload,
        )

        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
