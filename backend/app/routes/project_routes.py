# routes/project_routes.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import deps
from app.models.project import Project
from app.models.client import Client
from app.models.user import User
from app.models.user_profile import UserProfile
from app.schemas.project_schema import ProjectCreate
from app.utils.api_key import generate_api_key
from app.utils.token import get_current_client  
from app.deps import get_db
from app.schemas.user_schema import AllUsersResponse,UserProfileUpdate
router = APIRouter()

@router.post("/create", summary="Create new project and generate API key")
def create_project(
    payload: ProjectCreate,
    db: Session = Depends(get_db),
    current_client: Client = Depends(get_current_client)
):
    existing_projects = db.query(Project).filter(Project.client_id == current_client.id).count()

    if existing_projects >= 3:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You can only create up to 3 projects."
        )
    print(payload)
    api_key = generate_api_key()
    new_project = Project(
        name=payload.name,
        client_id=current_client.id,
        api_key=api_key
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return {
        "project_id": new_project.id,
        "name": new_project.name,
        "api_key": new_project.api_key,
        "created_at": new_project.created_at.isoformat()
    }


router = APIRouter()

@router.get("/all")
def get_all_projects(
    db: Session = Depends(get_db),
    client = Depends(get_current_client)
):
    projects = db.query(Project).filter(Project.client_id == client.id).all()

    result = []
    for project in projects:
        user_count = db.query(User).filter(User.project_id == project.id).count()
        result.append({
            "id": project.id,
            "name": project.name,
            "api_key": project.api_key,
            "created_at": project.created_at,
            "user_count": user_count,
            "request_count": project.request_count  
        })

    return {"projects": result}

@router.get("/all/{project_id}", response_model=AllUsersResponse)
def get_all_users_for_project(
    project_id: int,
    db: Session = Depends(get_db),
    client=Depends(get_current_client)
):
    project = db.query(Project).filter_by(id=project_id, client_id=client.id).first()
    if not project:
        raise HTTPException(status_code=403, detail="Access denied or invalid project ID")

    users = db.query(User).filter_by(project_id=project.id).all()

    project.user_count = len(users) 

    return {"users": users, "project": project}

@router.delete("/{project_id}/user/{user_id}")
def delete_user_from_project(
    project_id: int,
    user_id: int,
    db: Session = Depends(get_db),
    client=Depends(get_current_client)):
    
    project = db.query(Project).filter_by(id=project_id, client_id=client.id).first()
    if not project:
        raise HTTPException(status_code=403, detail="Access denied or invalid project ID")
   
    user = db.query(User).filter_by(id=user_id, project_id=project.id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found in this project")
    
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully from the project"}

@router.put("/{project_id}/user/{user_id}")
def update_user(
    project_id: int,
    user_id: int,
    payload: UserProfileUpdate,
    db: Session = Depends(get_db),
    client=Depends(get_current_client)
):
   
    project = db.query(Project).filter_by(id=project_id, client_id=client.id).first()
    if not project:
        raise HTTPException(status_code=403, detail="Access denied or invalid project")

    
    user = db.query(User).filter_by(id=user_id, project_id=project.id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    profile = db.query(UserProfile).filter_by(user_id=user.id).first()
    if not profile:
        profile = UserProfile(user_id=user.id)
        db.add(profile)

    for attr, value in payload.model_dump(exclude_unset=True).items():
        setattr(profile, attr, value)

    db.commit()
    return {"message": "User updated successfully"}
