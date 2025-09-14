#!/usr/bin/env python3
"""
Test login function directly
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from pymongo import MongoClient
from config import Config
import bcrypt
import jwt
from datetime import datetime, timedelta

def test_login_function():
    """Test the login function logic directly"""
    print("=== TESTING LOGIN FUNCTION ===")
    
    try:
        # Connect to database
        client = MongoClient(Config.MONGO_URI)
        db = client.get_database("Cluster0-Members-book")
        members_collection = db.get_collection("members")
        
        # Test admin login
        login_data = {
            'email': 'admin@test.com',
            'password': 'password'
        }
        
        print(f"Testing login with: {login_data['email']} / {login_data['password']}")
        
        # Find user
        user = members_collection.find_one({"email": login_data['email']})
        print(f"User found: {user is not None}")
        
        if user:
            print(f"User email: {user['email']}")
            print(f"User type: {user['user_type']}")
            print(f"Password hash exists: {user.get('password_hash') is not None}")
            
            # Test password verification
            password_hash = user['password_hash']
            password_bytes = login_data['password'].encode('utf-8')
            hash_bytes = password_hash.encode('utf-8')
            
            print(f"Password verification: {bcrypt.checkpw(password_bytes, hash_bytes)}")
            
            if bcrypt.checkpw(password_bytes, hash_bytes):
                # Generate token
                token = jwt.encode({
                    'public_id': str(user['_id']),
                    'role': user['user_type'],
                    'exp': datetime.utcnow() + timedelta(minutes=30)
                }, Config.JWT_SECRET_KEY, algorithm="HS256")
                
                print(f"Token generated successfully: {token[:20]}...")
                print(f"Login should succeed with user_type: {user['user_type']}")
                return {"access_token": token, "user_type": user['user_type']}, 200
            else:
                print("Password verification failed")
                return {"error": "Invalid credentials"}, 401
        else:
            print("User not found")
            return {"error": "Invalid credentials"}, 401
            
    except Exception as e:
        print(f"Error in login function: {e}")
        return {"error": "Internal server error"}, 500

if __name__ == "__main__":
    result, status_code = test_login_function()
    print(f"\nFinal result: {result}")
    print(f"Status code: {status_code}")