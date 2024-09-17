from sqlalchemy.orm import Session
from .models import User, MoodEntry
from .utils import hash_password, verify_password
from .schemas import UserCreate, MoodEntryCreate

def create_user(db: Session, user: UserCreate):
    hashed_password = hash_password(user.password)
    db_user = User(
        name=user.name,
        email=user.email,
        username=user.username,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if user and verify_password(password, user.hashed_password):
        return user
    return None

def create_mood_entry(db: Session, mood: MoodEntryCreate, user_id: int):
    db_mood = MoodEntry(emoji=mood.emoji, user_id=user_id)
    db.add(db_mood)
    db.commit()
    db.refresh(db_mood)
    return db_mood