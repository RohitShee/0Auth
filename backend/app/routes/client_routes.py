from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.client import Client
from app.schemas.client_schema import ClientRegister, ClientLogin
from app.utils.hashing import Hash
from app.utils.token import create_access_token,get_current_client
from app import deps

router = APIRouter()

# Signup Route
@router.post("/signup")
def register_client(payload: ClientRegister, db: Session = Depends(deps.get_db)):
    if db.query(Client).filter(Client.email == payload.email).first():
        raise HTTPException(status_code=400, detail="Client already registered")
    
    new_client = Client(
        email=payload.email,
        hashed_password=Hash.get_password_hash(payload.password),
        name=payload.name
    )
    db.add(new_client)
    db.commit()
    db.refresh(new_client)
    return {"message": "Client registered successfully"}

# Login Route
@router.post("/login")
def login_client(payload: ClientLogin, db: Session = Depends(deps.get_db)):
    print(payload)
    client = db.query(Client).filter(Client.email == payload.email).first()
    if not client or not Hash.verify(payload.password, client.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token(data={"sub": str(client.id)})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/check-auth")
def auth_check(current_client: Client = Depends(get_current_client)):
    return {
        "message": "Client is authenticated ",
        "client": {
            "id": current_client.id,
            "email": current_client.email,
            "name": current_client.name,
        }
    }
