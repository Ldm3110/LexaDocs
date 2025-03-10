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
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5173",
    "http://localhost:5173",
]

# Ajout du middleware CORS à l'application
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routers
app.include_router(authentication.router)
app.include_router(firm.router)
app.include_router(customers.router)
