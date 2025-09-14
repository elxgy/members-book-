#!/usr/bin/env python3
"""
Simple debug script to check authentication issues
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from pymongo import MongoClient
from config import Config
import bcrypt

def debug_database_users():
    """Check what users exist in the database"""
    print("=== DATABASE USERS DEBUG ===")
    
    try:
        # Connect to database
        client = MongoClient(Config.MONGO_URI)
        db = client.get_database("Cluster0-Members-book")
        members_collection = db.get_collection("members")
        
        # Get all users from database
        users = list(members_collection.find({}))
        print(f"Total users found: {len(users)}")
        
        for i, user in enumerate(users, 1):
            print(f"\n--- User {i} ---")
            print(f"ID: {user.get('_id')}")
            print(f"Email: {user.get('email')}")
            print(f"Name: {user.get('name')}")
            print(f"User Type: {user.get('user_type')}")
            password_hash = user.get('password_hash', 'NOT SET')
            if password_hash != 'NOT SET':
                print(f"Password Hash: {password_hash[:20]}...")
            else:
                print(f"Password Hash: {password_hash}")
            print(f"Tier: {user.get('tier')}")
            print(f"All fields: {list(user.keys())}")
            
    except Exception as e:
        print(f"Error accessing database: {e}")

def test_admin_login():
    """Test admin login specifically"""
    print("\n=== ADMIN LOGIN TEST ===")
    
    try:
        # Connect to database
        client = MongoClient(Config.MONGO_URI)
        db = client.get_database("Cluster0-Members-book")
        members_collection = db.get_collection("members")
        
        # Find admin user
        admin_user = members_collection.find_one({"email": "admin@test.com"})
        if admin_user:
            print(f"Admin user found: {admin_user.get('email')}")
            print(f"User type: {admin_user.get('user_type')}")
            
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
                        if is_valid:
                            print(f"*** CORRECT PASSWORD FOUND: {pwd} ***")
                    except Exception as e:
                        print(f"Error verifying password '{pwd}': {e}")
            else:
                print("No password hash found for admin user")
        else:
            print("Admin user not found in database")
            
    except Exception as e:
        print(f"Error testing admin login: {e}")

if __name__ == "__main__":
    debug_database_users()
    test_admin_login()