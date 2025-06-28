from fastapi import FastAPI
from app.routes import client_routes

app = FastAPI()

# Register client-related routes
app.include_router(client_routes.router, prefix="/client", tags=["Client"])

@app.get("/")
def root():
    return {"message": "Auth-as-a-Service is running 🚀"}
