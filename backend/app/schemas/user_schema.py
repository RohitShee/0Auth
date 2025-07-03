# schemas/user.py

from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any,List

class UserSignup(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None
    avatar_url: Optional[str] = None
    role: Optional[str] = None
    custom_fields: Optional[Dict[str, Any]] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str
class UserProfileOut(BaseModel):
    name: Optional[str]
    avatar_url: Optional[str]
    role: Optional[str]
    custom_fields: Optional[Dict[str, str]]

    class Config:
        from_attributes = True

class UserOut(BaseModel):
    id: int
    email: EmailStr
    user_profile: Optional[UserProfileOut]

    class Config:
        from_attributes = True

class AllUsersResponse(BaseModel):
    users: List[UserOut]
