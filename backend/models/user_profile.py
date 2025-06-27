# models/user_profile.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String,nullable=True)
    avatar_url = Column(String,nullable=True)
    bio = Column(String,nullable=True)

    user = relationship("User", back_populates="profile")
