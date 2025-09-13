from backend.app.utils.database import members_collection
from backend.app.models.member import Member
import bcrypt

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
        if not members_collection.find_one({"email": user_data["email"]}):
            hashed_password = bcrypt.hashpw(user_data['password'].encode('utf-8'), bcrypt.gensalt())
            new_user = Member(
                name=user_data['name'],
                email=user_data['email'],
                password_hash=hashed_password.decode('utf-8'),
                tier=user_data['tier'],
                contact_info={},
                user_type=user_data['user_type'],
            )
            members_collection.insert_one(new_user.dict(by_alias=True, exclude_none=True))
            print(f"User {user_data['email']} seeded.")
        else:
            print(f"User {user_data['email']} already exists.")

if __name__ == '__main__':
    seed_users()
