
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models import SessionLocal, User # database model stuff is here

router = APIRouter()

# pydantic models
class LoginRequest(BaseModel):
    username: str
    password: str

class RegistrationRequest(BaseModel):
    username: str
    password: str

# use @ : decorator tells the fastapi that this is a route

@router.post("/register")
def register(user:RegistrationRequest):
    db = SessionLocal()

    if db.query(User).filter(User.username == user.username).first():
        db.close()
        raise HTTPException(status_code = 400, detail = "Username already registered")
    

    new_user = User(
        username = user.username, 
        password = user.password )
    db.add(new_user)
    db.commit()
    db.close()
    return {"message": "Successfully registered"}


@router.post("/login")
def login(user: LoginRequest):
    db = SessionLocal()
    
    db_user = db.query(User).filter(User.username == user.username, User.password == user.password).first()
    db.close()
    if db_user:
        return {"message": "Login Successful"}

    else:
        raise HTTPException (status_code = 400, detail = "Invalid credentials")
    

