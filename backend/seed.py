import bcrypt
from backend.app.utils.database import members_collection
from backend.app.models.member import Member
from datetime import datetime

def seed_users():
    print("Seeding users...")
    users_to_seed = [
        {
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
            new_user_doc["created_at"] = datetime.utcnow() # Set creation date for new user
            members_collection.insert_one(new_user_doc)
            print(f"User {user_data['email']} seeded.")

if __name__ == '__main__':
    seed_users()