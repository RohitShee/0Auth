# routes/user_routes.py

from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session
from app import deps
from app.models.project import Project
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserLogin
from app.utils.hashing import Hash
from app.utils.token import create_access_token
from app.utils.user_token import get_current_user
router = APIRouter()

# User Signup
@router.post("/signup")
def signup_user(
    payload: UserCreate,
    x_api_key: str = Header(...),
    db: Session = Depends(deps.get_db)
):
    # Validate API Key
    project = db.query(Project).filter(Project.api_key == x_api_key).first()
    if not project:
        raise HTTPException(status_code=401, detail="Invalid API Key")

    if db.query(User).filter(User.email == payload.email, User.project_id == project.id).first():
        raise HTTPException(status_code=400, detail="User already exists for this project")

    user = User(
        email=payload.email,
        hashed_password=Hash.get_password_hash(payload.password),
        project_id=project.id
    )
    db.add(user)
    token = create_access_token(data={"sub": str(user.id)})
    project.request_count += 1

    db.commit()
    db.refresh(user)
    return {"message": "User signed up successfully", "user" : {"user_id" : user.id,"email":user.email} , "auth_details" : {"access_token": token, "token_type": "bearer"} }

@router.post("/login")
def login_user(
    payload: UserLogin,
    x_api_key: str = Header(...),
    db: Session = Depends(deps.get_db)
):
    project = db.query(Project).filter(Project.api_key == x_api_key).first()
    if not project:
        raise HTTPException(status_code=401, detail="Invalid API Key")

    user = db.query(User).filter(User.email == payload.email, User.project_id == project.id).first()
    if not user or not Hash.verify(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(data={"sub": str(user.id)})

    project.request_count += 1
    db.commit()

    return {"message": "User logged in successfully", "user" : {"user_id" : user.id,"email":user.email} , "auth_details" : {"access_token": token, "token_type": "bearer"} }

@router.get("/me", summary="Check if user is authenticated")
def get_authenticated_user(
    x_api_key: str = Header(...),
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(get_current_user)):
    project = db.query(Project).filter(Project.api_key == x_api_key).first()
    if not project:
        raise HTTPException(status_code=401, detail="Invalid API Key")
    project.request_count += 1
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "project_id": current_user.project_id
    }