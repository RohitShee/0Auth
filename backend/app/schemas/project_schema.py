# schemas/project_schema.py
from pydantic import BaseModel

class ProjectCreate(BaseModel):
    name: str
