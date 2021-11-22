from fastapi import FastAPI,HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, engine
import auth, schemas, models

auth_handler = auth.AuthHandler()

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get('/')
async def read_root():
	return {"message":"Muhammad Erwin Fattah/ 18219019. tambahkan  /docs pada url untuk endpoints."}


@app.post('/register')
async def register( auth_details: schemas.AuthDetails,  db: Session = Depends(get_db) ):
    if (db.query(models.UserData).filter(models.UserData.username == auth_details.username).first() ):
        raise HTTPException(status_code=400, detail='Username is taken')
    hashed_password = auth_handler.get_password_hash(auth_details.password)
    new_user = models.UserData(
	username = auth_details.username,
	password = hashed_password
)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message" : "You're registered"}


@app.post('/login')
async def login( auth_details: schemas.AuthDetails, db: Session = Depends(get_db)):
    user = None
    
    if (db.query(models.UserData).filter(models.UserData.username == auth_details.username).first()):
        user = db.query(models.UserData).filter(models.UserData.username == auth_details.username).first()
        token = auth_handler.encode_token(user.username)
              
    if (user is None) or (not auth_handler.verify_password(auth_details.password, user.password)):
        raise HTTPException(status_code=401, detail='Invalid username and/or password')
    return { 'token': token }