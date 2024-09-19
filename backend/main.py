from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, crud, auth
from .models import Base, User, MoodEntry
from .database import engine, get_db
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from .auth import get_current_user
from datetime import datetime, timedelta

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://moodtracker-pd9afczd4-azmain-morsheds-projects.vercel.app"],  # Or ["*"] to allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (POST, GET, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Create database tables
models.Base.metadata.create_all(bind=engine)

@app.post("/signup", response_model=schemas.UserResponse)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if username or email already exists
    if db.query(models.User).filter(models.User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    if db.query(models.User).filter(models.User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")

    # Create the new user
    return crud.create_user(db=db, user=user)

@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    access_token = auth.create_access_token(data={"sub": user.username})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "username": user.username,
        "userID": user.id  
    }

@app.post("/mood", response_model=schemas.MoodEntryResponse)
def submit_mood(
    mood: schemas.MoodEntryCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.create_mood_entry(db=db, mood=mood, user_id=current_user.id)

@app.get("/stats")
def get_user_stats(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    user_id = current_user.id  # Ensure this is correctly fetching the logged-in user's ID

    # Fetch all mood entries for the logged-in user
    moods = db.query(MoodEntry).filter(MoodEntry.user_id == user_id).all()

    if not moods:
        raise HTTPException(status_code=404, detail="No mood data available for this user.")

    # Get the last logged mood
    last_mood_entry = moods[-1]
    last_mood = last_mood_entry.emoji
    last_date = last_mood_entry.timestamp.strftime("%Y-%m-%d %I:%M %p")

    # Get today's date and filter mood entries for today
    today_start = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    moods_today = db.query(MoodEntry).filter(
        MoodEntry.user_id == user_id,
        MoodEntry.timestamp >= today_start
    ).all()

    moods_today_count = {"😀": 0, "😐": 0, "😢": 0, "😡": 0}  # Unicode emoji keys
    all_time_count = {"😀": 0, "😐": 0, "😢": 0, "😡": 0}

    # Count today's moods
    for mood_entry in moods_today:
        moods_today_count[mood_entry.emoji] += 1

    # Count all-time moods
    for mood_entry in moods:
        all_time_count[mood_entry.emoji] += 1

    return {
        "last_mood": last_mood,
        "last_date": last_date,
        "today": moods_today_count,
        "all_time": all_time_count,
    }

@app.get("/moods/last7days")
def get_last_7_days_moods(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    from datetime import datetime, timedelta

    # Calculate the date 7 days ago
    seven_days_ago = datetime.now() - timedelta(days=7)

    # Fetch all mood entries for the logged-in user within the last 7 days
    moods = db.query(models.MoodEntry).filter(
        models.MoodEntry.user_id == current_user.id,
        models.MoodEntry.timestamp >= seven_days_ago
    ).order_by(models.MoodEntry.timestamp).all()

    return [{
        "date": mood.timestamp.strftime("%Y-%m-%d"),  # format the date to 'YYYY-MM-DD'
        "emoji": mood.emoji  # store the emoji
    } for mood in moods]

