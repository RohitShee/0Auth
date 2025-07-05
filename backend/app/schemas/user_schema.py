# schemas/user.py
from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any,List

class UserSignup(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None
    avatar_url: Optional[str] = None
    role: Optional[str] = None
    custom_field: Optional[Dict[str, Any]] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str
class UserProfileOut(BaseModel):
    name: Optional[str]
    avatar_url: Optional[str]
    role: Optional[str]
    custom_field: Optional[Dict[str, Any]] = {}

    class Config:
        from_attributes = True

class UserOut(BaseModel):
    id: int
    email: EmailStr
    user_profile: Optional[UserProfileOut]

    class Config:
        from_attributes = True

class project (BaseModel) :
    id: int
    name: str
    api_key: str
    created_at: datetime
    user_count: Optional[int] = 0
    request_count: Optional[int] = 0
    
    class Config:
        from_attributes = True

class AllUsersResponse(BaseModel):
    users: List[UserOut] 
    project: Optional[project] 
class AuthDetails(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserAuthResponse(BaseModel):
    message: str
    user: UserOut
    auth_details: AuthDetails


class UserProfileUpdate(BaseModel):
    name: Optional[str]
    avatar_url: Optional[str]
    role: Optional[str]
    custom_field: Optional[Dict[str, Any]] = {}

