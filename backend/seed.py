import sys
import os

# Add the project root to the Python path
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, project_root)

import bcrypt
from backend.app.utils.database import members_collection, members_info_collection, value_requests_collection
from backend.app.models.member import Member
from backend.app.models.member_info import MemberInfo
from backend.app.models.value_request import ValueRequest, RequestType, RequestStatus
from backend.app.services import ai_description_service
from datetime import datetime
from bson import ObjectId

def seed_users():
    print("Seeding users...")
    users_to_seed = [
        {
            "_id": "60f8f7b3b3f3b3f3b3f3b3f1",
            "name": "Admin User",
            "email": "admin@test.com",
            "password": "password",
            "tier": "socios",
            "user_type": "admin"
        },
        {
            "name": "Member User",
            "email": "member@test.com",
            "password": "password",
            "tier": "infinity",
            "user_type": "member"
        },
        {
            "name": "Guest User",
            "email": "guest@test.com",
            "password": "password",
            "tier": "disruption",
            "user_type": "guest"
        }
    ]

    for user_data in users_to_seed:
        existing_user = members_collection.find_one({"email": user_data["email"]})
        
        hashed_password = bcrypt.hashpw(user_data['password'].encode('utf-8'), bcrypt.gensalt())
        
        new_user_doc = {
            "name": user_data['name'],
            "email": user_data['email'],
            "password_hash": hashed_password.decode('utf-8'),
            "tier": user_data['tier'],
            "contact_info": {}, # Keep empty for now
            "profile_image_url": None,
            "description": None,
            "user_type": user_data['user_type'],
            "updated_at": datetime.utcnow(),
            "last_login": None,
            "is_active": True
        }

        if existing_user:
            # Preserve original creation date if updating
            new_user_doc["created_at"] = existing_user.get("created_at", datetime.utcnow())
            members_collection.replace_one({"_id": existing_user["_id"]}, new_user_doc)
            print(f"User {user_data['email']} updated.")
        else:
            if "_id" in user_data:
                new_user_doc["_id"] = ObjectId(user_data["_id"])
            new_user_doc["created_at"] = datetime.utcnow() # Set creation date for new user
            members_collection.insert_one(new_user_doc)
            print(f"User {user_data['email']} seeded.")

def seed_members_info():
    print("Seeding members info...")
    members = list(members_collection.find())
    print(f"Found {len(members)} members to seed info for.")
    for member in members:
        existing_member_info = members_info_collection.find_one({"user_id": str(member["_id"])})
        
        member_info_data = {
            "user_id": str(member["_id"]),
            "name": member["name"],
            "email": member["email"],
            "company": "Test Company",
            "sector": "Technology",
            "hierarchy": "Manager",
            "photo": None,
            "phone": "123-456-7890",
            "linkedin": "https://www.linkedin.com/in/test",
            "instagram": "https://www.instagram.com/test",
            "website": "https://www.test.com",
            "title": "Test Title",
            "expertise": ["Test", "Development"],
            "connections": 100,
            "negocios_fechados": 10,
            "valor_total": 10000.0,
            "indicacoes_recebidas": 5,
            "valor_total_por_indicacao": 5000.0,
            "indicacoes_fornecidas": 5,
            "valor_total_acumulado": 20000.0,
            "updated_at": datetime.utcnow()
        }

        if existing_member_info:
            member_info_data["created_at"] = existing_member_info.get("created_at", datetime.utcnow())
            members_info_collection.replace_one({"_id": existing_member_info["_id"]}, member_info_data)
            print(f"Member info for user {member['email']} updated.")
        else:
            member_info_data["created_at"] = datetime.utcnow()
            members_info_collection.insert_one(member_info_data)
            print(f"Member info for user {member['email']} seeded.")

def seed_value_requests():
    print("Seeding value requests collection...")
    # Create a sample value request to ensure the collection exists
    admin_user = members_collection.find_one({"email": "admin@test.com"})
    member_user = members_collection.find_one({"email": "member@test.com"})
    
    if admin_user and member_user:
        sample_request = {
            "member_id": str(member_user["_id"]),
            "request_type": RequestType.BOTH.value,
            "current_deal_count": 5,
            "current_deal_value": 50000.0,
            "requested_deal_count": 10,
            "requested_deal_value": 100000.0,
            "justification": "Sample request for testing purposes",
            "verified": False,
            "status": RequestStatus.PENDING.value,
            "admin_notes": None,
            "verified_by": None,
            "verified_at": None,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        existing_request = value_requests_collection.find_one({"member_id": str(member_user["_id"])})
        if not existing_request:
            value_requests_collection.insert_one(sample_request)
            print("Sample value request created.")
        else:
            print("Sample value request already exists.")
    
    print("Value requests collection is ready.")

def generate_descriptions_for_all_users():
    print("Generating descriptions for all users...")
    members = list(members_collection.find())
    for member in members:
        print(f"Generating description for {member['email']}...")
        ai_description_service.generate_description(str(member["_id"]))

if __name__ == '__main__':
    seed_users()
    seed_members_info()
    seed_value_requests()
    generate_descriptions_for_all_users()
