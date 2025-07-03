# app/models/user_profile.py
from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database import Base

class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    name = Column(String(100), nullable=True)          
    avatar_url = Column(String(500), nullable=True)
    role = Column(String(50), nullable=True)
    custom_field = Column(JSON, nullable=True)

# Relationship with User model
from app.models.user import User
UserProfile.users = relationship("User", back_populates="user_profile")
