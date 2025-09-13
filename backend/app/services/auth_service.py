import bcrypt
import jwt
from datetime import datetime, timedelta
from backend.app.models.member import Member
from backend.app.utils.database import members_collection
from backend.config import Config
from bson import ObjectId

def register_user(data):
    # Check if user already exists
    if members_collection.find_one({"email": data['email']}):
        return {"error": "User already exists"}, 409

    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    new_user = Member(
        name=data['name'],
        email=data['email'],
        password_hash=hashed_password.decode('utf-8'),
        tier='disruption',  # Default tier
        contact_info={},
        user_type='member',
    )

    result = members_collection.insert_one(new_user.dict(by_alias=True, exclude_none=True))
    return {"message": "User registered successfully", "user_id": str(result.inserted_id)}, 201

def login_user(data):
    user = members_collection.find_one({"email": data['email']})

    if not user or not bcrypt.checkpw(data['password'].encode('utf-8'), user['password_hash'].encode('utf-8')):
        return {"error": "Invalid credentials"}, 401

    token = jwt.encode({
        'public_id': str(user['_id']),
        'exp': datetime.utcnow() + timedelta(minutes=30)
    }, Config.JWT_SECRET_KEY, algorithm="HS256")

    return {"token": token}, 200