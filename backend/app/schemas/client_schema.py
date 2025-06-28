from pydantic import BaseModel, EmailStr,Field


class ClientRegister(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=128)
    name: str

class ClientLogin(BaseModel):
    email: EmailStr
    password: str
