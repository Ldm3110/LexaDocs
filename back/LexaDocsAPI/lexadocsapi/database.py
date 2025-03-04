from sqlmodel import create_engine, SQLModel, Session

from lexadocsapi.dataEnv.data_env import DB_USER, DB_PASS, DB_NAME


# Connexion
database_url = f"mysql+mysqldb://{DB_USER}:{DB_PASS}@localhost/{DB_NAME}"

engine = create_engine(database_url)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
