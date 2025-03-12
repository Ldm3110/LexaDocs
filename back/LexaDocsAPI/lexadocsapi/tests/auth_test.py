from fastapi.testclient import TestClient
from starlette import status

from lexadocsapi.models.users.customers import Customers
from lexadocsapi.tests.database import session_fixture, client_fixture
from lexadocsapi.tests.fixtures import (
    create_expired_token,
    get_access_token,
    fake_customer,
)


class TestAuthCustomers:

    def test_good_credentials(self, client: TestClient, fake_customer: Customers):
        payload = {"username": fake_customer.email, "password": "S3cret1234"}
        response = client.post("/authentication/customers", data=payload)

        assert response.status_code == status.HTTP_200_OK

    def test_bad_credentials(self, client: TestClient, fake_customer: Customers):
        payload = {
            "username": "toto",  # Here is the bad  data
            "password": "S3cret1234",
        }
        response = client.post("/authentication/customers", data=payload)

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_customer_always_connected(
        self, client: TestClient, fake_customer: Customers
    ):
        token = get_access_token(client=client, test_user=fake_customer)
        response = client.get("/me", headers={"Authorization": f"Bearer {token}"})

        assert response.status_code == status.HTTP_200_OK

    # TODO: Search solution to generate a customer with an expired token

    # def test_customer_no_longer_connected(
    #     self, client: TestClient, fake_customer: Customers
    # ):
    #     expired_token = create_expired_token()
    #     response = client.get(
    #         "/me", headers={"Authorization": f"Bearer {expired_token}"}
    #     )
    #     response_content = response.json()

    #     assert response.status_code == status.HTTP_401_UNAUTHORIZED
    #     assert response_content == {"detail": "User not authenticated"}

    def test_no_token(self, client: TestClient, fake_customer: Customers):
        response = client.get("/me")

        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        assert response.json() == {"detail": "Token does not exist"}

    def test_customer_logout(self, client: TestClient, fake_customer: Customers):
        token = get_access_token(client=client, test_user=fake_customer)
        response = client.post("/logout", headers={"Authorization": f"Bearer{token}"})

        assert response.status_code == status.HTTP_200_OK
