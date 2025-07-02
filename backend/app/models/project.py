# models/project.py
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime,timezone
from app.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"))
    name = Column(String(50), nullable=False)
    api_key = Column(String(50), unique=True, nullable=False)
    request_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

from app.models.client import Client
from app.models.user import User

Project.client = relationship("Client", back_populates="projects")
Project.users = relationship("User", back_populates="project")

