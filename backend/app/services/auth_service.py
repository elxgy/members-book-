import bcrypt
import jwt
from datetime import datetime, timedelta
from backend.app.models.member import Member
from backend.app.utils.database import members_collection
from backend.config import Config

def register_user(data):
    # Check if user already exists
    if members_collection.find_one({"email": data['email']}):
        return {"error": "User already exists"}, 409

    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    # Determine user type based on is_admin flag
    user_type = 'admin' if data.get('is_admin', False) else 'member'
    
    new_user = Member(
        name=data['name'],
        email=data['email'],
        password_hash=hashed_password.decode('utf-8'),
        password_plain=data['password'],  # Store plain text password for development
        tier='disruption',  # Default tier
        contact_info={},
        user_type=user_type,
    )

    result = members_collection.insert_one(new_user.dict(by_alias=True, exclude_none=True))
    return {"message": "User registered successfully", "user_id": str(result.inserted_id)}, 201

def login_user(data):
    user = members_collection.find_one({"email": data['email']})

    if not user or not bcrypt.checkpw(data['password'].encode('utf-8'), user['password_hash'].encode('utf-8')):
        return {"error": "Invalid credentials"}, 401

    token = jwt.encode({
        'public_id': str(user['_id']),
        'role': user['user_type'],
        'exp': datetime.utcnow() + timedelta(minutes=30)
    }, Config.JWT_SECRET_KEY, algorithm="HS256")

    return {"access_token": token, "user_type": user['user_type']}, 200

def guest_login():
    """Login as guest user without credentials"""
    # Find the default guest user
    guest_user = members_collection.find_one({"email": "guest@test.com", "user_type": "guest"})
    
    if not guest_user:
        return {"error": "Guest user not found"}, 404
    
    # Generate JWT token for guest user
    token = jwt.encode({
        'public_id': str(guest_user['_id']),
        'role': 'guest',
        'exp': datetime.utcnow() + timedelta(minutes=30)
    }, Config.JWT_SECRET_KEY, algorithm="HS256")
    
    return {"access_token": token, "user_type": "guest"}, 200