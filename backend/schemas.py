from pydantic import BaseModel
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    email: str
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str 
    email: str
    username: str

    class Config:
        orm_mode = True

class MoodEntryCreate(BaseModel):
    emoji: str

class MoodEntryResponse(BaseModel):
    id: int
    emoji: str
    timestamp: datetime
    user_id: int

    class Config:
        orm_mode = True