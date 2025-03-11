import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from sqlmodel.pool import StaticPool
from sqlalchemy_utils import database_exists, create_database, drop_database

from lexadocsapi.main import app
from lexadocsapi.database import get_session

from lexadocsapi.dataEnv.data_env import DB_NAME_TEST, DB_PASS, DB_USER

def setup_database():
    db_url = f"mysql+mysqldb://{DB_USER}:{DB_PASS}@localhost/{DB_NAME_TEST}"

    if not database_exists(db_url):
        create_database(db_url)

    engine = create_engine(
        db_url,
        poolclass=StaticPool,
    )
    SQLModel.metadata.create_all(engine)

    return engine


@pytest.fixture(name="session")
def session_fixture():
    engine = setup_database()
    with Session(engine) as session:
        yield session
    drop_database(engine.url)


@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_session_override():
        return session

    app.dependency_overrides[get_session] = get_session_override

    client = TestClient(app=app)
    yield client
    app.dependency_overrides.clear()

