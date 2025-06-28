# models/user_profile.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String(50),nullable=True)
    avatar_url = Column(String(500),nullable=True)
    bio = Column(String(200),nullable=True)


from app.models.user import User

UserProfile.users = relationship("User", back_populates="user_profile")

