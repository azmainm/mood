from pydantic import BaseModel

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
