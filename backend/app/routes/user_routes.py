# routes/user_routes.py

from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session
from app.models.project import Project
from app.models.user import User
from app.models.user_profile import UserProfile
from app.schemas.user_schema import  UserLogin,UserSignup, UserOut,UserAuthResponse
from app.utils.hashing import Hash
from app.utils.token import create_access_token
from app.utils.user_token import get_current_user
from app.deps import get_db, get_project_from_api_key
router = APIRouter()

# User Signup
@router.post("/signup",response_model=UserAuthResponse)
def signup_user(
    payload: UserSignup,
    db: Session = Depends(get_db),
    project: Project = Depends(get_project_from_api_key)
):
    # 1. Check for existing user
    existing = db.query(User).filter_by(email=payload.email, project_id=project.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    # 2. Create user
    hashed_password = Hash.get_password_hash(payload.password)
    new_user = User(email=payload.email, hashed_password=hashed_password, project_id=project.id)
    db.add(new_user)
    db.flush()  # get new_user.id without committing

    # 3. Create user profile
    profile = UserProfile(
        user_id=new_user.id,
        name=payload.name,
        avatar_url=payload.avatar_url,
        role=payload.role,
        custom_field=payload.custom_field
    )
    db.add(profile)

    db.commit()
    db.refresh(new_user)

    # 4. Generate token, etc
    token = create_access_token(data={"sub": str(new_user.id)})
    return {
        "message": "User signed up successfully",
        "user": new_user,
        "auth_details": {
            "access_token": token,
            "token_type": "bearer"
        }
    }

@router.post("/login", response_model=UserAuthResponse)
def login_user(
    payload: UserLogin,
    db: Session = Depends(get_db),
    project: Project = Depends(get_project_from_api_key)
):

    user = db.query(User).filter(User.email == payload.email, User.project_id == project.id).first()
    if not user or not Hash.verify(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(data={"sub": str(user.id)})

    db.commit()

    return {
        "message": "User logged in successfully",
        "user": user,
        "auth_details": {
            "access_token": token,
            "token_type": "bearer"
        }
    }

@router.get("/me", response_model=UserOut, summary="Check if user is authenticated")
def get_authenticated_user(
    db: Session = Depends(get_db),
    project: Project = Depends(get_project_from_api_key),
    current_user: User = Depends(get_current_user)):
    return {
        "message": "User is Authenticated",
        "user": current_user,
    }