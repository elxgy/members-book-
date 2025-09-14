#!/usr/bin/env python3
"""
Simple test script to verify guest login functionality
"""

import sys
import os

# Add the project root to the Python path
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, project_root)

from backend.app.services.auth_service import guest_login
from backend.app.utils.database import members_collection
import jwt
from backend.config import Config

def test_guest_login_function():
    print("Testing guest login functionality...")
    
    # First check if guest user exists
    guest_user = members_collection.find_one({"email": "guest@test.com", "user_type": "guest"})
    if not guest_user:
        print("❌ Guest user not found in database. Please run seed.py first.")
        return False
    
    print("✅ Guest user found in database")
    
    # Test the guest_login function
    try:
        response, status_code = guest_login()
        
        if status_code != 200:
            print(f"❌ Guest login failed with status code: {status_code}")
            print(f"Response: {response}")
            return False
        
        print("✅ Guest login function returned success")
        
        # Verify the response contains required fields
        if 'token' not in response or 'user_type' not in response:
            print("❌ Response missing required fields")
            return False
        
        if response['user_type'] != 'guest':
            print(f"❌ Wrong user type: {response['user_type']}")
            return False
        
        print("✅ Response contains correct fields")
        
        # Verify the JWT token
        try:
            decoded_token = jwt.decode(response['token'], Config.JWT_SECRET_KEY, algorithms=["HS256"])
            
            if decoded_token['role'] != 'guest':
                print(f"❌ Wrong role in token: {decoded_token['role']}")
                return False
            
            print("✅ JWT token is valid and contains correct role")
            print(f"Token payload: {decoded_token}")
            
        except jwt.InvalidTokenError as e:
            print(f"❌ Invalid JWT token: {e}")
            return False
        
        print("\n🎉 All tests passed! Guest login functionality is working correctly.")
        return True
        
    except Exception as e:
        print(f"❌ Error testing guest login: {e}")
        return False

if __name__ == '__main__':
    success = test_guest_login_function()
    sys.exit(0 if success else 1)