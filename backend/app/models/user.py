# models/user.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime,timezone
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    email = Column(String(50), nullable=False)
    hashed_password = Column(String(500), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default= lambda: datetime.now(timezone.utc))

from app.models.project import Project
from app.models.user_profile import UserProfile
User.project = relationship("Project", back_populates="users")
User.user_profile = relationship("UserProfile", uselist=False, back_populates="users")