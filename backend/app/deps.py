# deps.py
from app.database import SessionLocal
from fastapi import Header, HTTPException, status, Depends
from sqlalchemy.orm import Session
from app.models.project import Project

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_project_from_api_key(
    x_api_key: str = Header(..., alias="X-API-Key"),
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(Project.api_key == x_api_key).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key"
        )
    project.request_count +=1
    return project