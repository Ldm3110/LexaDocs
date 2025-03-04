from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from lexadocsapi.database import create_db_and_tables
from lexadocsapi.routers import firm, customers, authentication


def on_startup(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=on_startup)

# CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Ajout du middleware CORS à l'application
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Autorise les origines définies
    allow_credentials=True,  # Autorise les cookies, etc.
    allow_methods=["*"],  # Autorise toutes les méthodes (GET, POST, etc.)
    allow_headers=["*"],  # Autorise tous les en-têtes
)

# routers
app.include_router(authentication.router)
app.include_router(firm.router)
app.include_router(customers.router)


if __name__ == "__main__":
    on_startup()
