#!/usr/bin/env python3
"""
Debug script to check authentication issues
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.utils.database import members_collection
from app.services.auth_service import login_user
from app.models.member import Member
import bcrypt
import json
from bson import ObjectId

def debug_database_users():
    """Check what users exist in the database"""
    print("=== DATABASE USERS DEBUG ===")
    
    try:
        # Get all users from database
        users = list(members_collection.find({}))
        print(f"Total users found: {len(users)}")
        
        for i, user in enumerate(users, 1):
            print(f"\n--- User {i} ---")
            print(f"ID: {user.get('_id')}")
            print(f"Email: {user.get('email')}")
            print(f"Name: {user.get('name')}")
            print(f"User Type: {user.get('user_type')}")
            print(f"Password Hash: {user.get('password_hash', 'NOT SET')[:20]}...")
            print(f"Tier: {user.get('tier')}")
            print(f"All fields: {list(user.keys())}")
            
    except Exception as e:
        print(f"Error accessing database: {e}")

def test_password_verification():
    """Test password hashing and verification"""
    print("\n=== PASSWORD VERIFICATION TEST ===")
    
    # Test password hashing
    test_password = "admin123"
    hashed = bcrypt.hashpw(test_password.encode('utf-8'), bcrypt.gensalt())
    print(f"Test password: {test_password}")
    print(f"Hashed: {hashed}")
    
    # Test verification
    is_valid = bcrypt.checkpw(test_password.encode('utf-8'), hashed)
    print(f"Verification result: {is_valid}")
    
    # Test with admin user from database
    try:
        admin_user = members_collection.find_one({"email": "admin@test.com"})
        if admin_user:
            print(f"\nAdmin user found: {admin_user.get('email')}")
            stored_hash = admin_user.get('password_hash')
            if stored_hash:
                # Try with different password formats
                passwords_to_try = ["admin123", "password", "admin"]
                for pwd in passwords_to_try:
                    try:
                        if isinstance(stored_hash, str):
                            stored_hash_bytes = stored_hash.encode('utf-8')
                        else:
                            stored_hash_bytes = stored_hash
                        
                        is_valid = bcrypt.checkpw(pwd.encode('utf-8'), stored_hash_bytes)
                        print(f"Password '{pwd}' verification: {is_valid}")
                    except Exception as e:
                        print(f"Error verifying password '{pwd}': {e}")
            else:
                print("No password hash found for admin user")
        else:
            print("Admin user not found in database")
    except Exception as e:
        print(f"Error testing admin password: {e}")

def test_login_function():
    """Test the login_user function directly"""
    print("\n=== LOGIN FUNCTION TEST ===")