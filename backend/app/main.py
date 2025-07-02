from fastapi import FastAPI
from app.routes import client_routes,project_routes,user_routes
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)
# Register client-related routes
app.include_router(client_routes.router, prefix="/api/client", tags=["Client"])
app.include_router(project_routes.router, prefix="/api/project", tags=["Project"])
app.include_router(user_routes.router,prefix="/api/user",tags=["user"])
@app.get("/")
def root():
    return {"message": "Auth-as-a-Service is running 🚀"}
