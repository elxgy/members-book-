from backend.app.utils.database import members_collection
from backend.app.models.member import Member
from bson import ObjectId
import bcrypt

def get_all_users():
    users = members_collection.find()
    return [{**user, '_id': str(user['_id'])} for user in users]

def update_user_tier(user_id, tier):
    result = members_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"tier": tier}}
    )
    if result.modified_count > 0:
        return {"message": "User tier updated successfully"}
    return {"error": "User not found or tier not changed"}

def create_user(data):
    # Check if user already exists
    if members_collection.find_one({"email": data['email']}):
        return {"error": "User already exists"}, 409

    # Hash password if provided
    password_hash = None
    password_plain = None
    if 'password' in data:
        password_hash = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        password_plain = data['password']  # Store plain text password for development

    new_user = Member(
        name=data['name'],
        email=data['email'],
        password_hash=password_hash,
        password_plain=password_plain,
        tier=data.get('tier', 'disruption'),
        contact_info=data.get('contact_info', {}),
        user_type=data.get('user_type', 'member'),
        verified=data.get('verified', False)
    )
    
    result = members_collection.insert_one(new_user.dict(by_alias=True, exclude_none=True))
    return {"message": "User created successfully", "user_id": str(result.inserted_id)}, 201

def update_user(user_id, data):
    # Check if user exists
    user = members_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        return {"error": "User not found"}, 404

    # Prepare update data
    update_data = {}
    allowed_fields = ['name', 'email', 'tier', 'contact_info', 'user_type', 'verified']
    
    for field in allowed_fields:
        if field in data:
            update_data[field] = data[field]
    
    # Handle password update separately
    if 'password' in data:
        password_hash = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        update_data['password_hash'] = password_hash
        update_data['password_plain'] = data['password']  # Store plain text password for development
    
    if not update_data:
        return {"error": "No valid fields to update"}, 400
    
    result = members_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": update_data}
    )
    
    if result.modified_count > 0:
        return {"message": "User updated successfully"}, 200
    return {"error": "No changes made"}, 400

def delete_user(user_id):
    # Check if user exists
    user = members_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        return {"error": "User not found"}, 404
    
    result = members_collection.delete_one({"_id": ObjectId(user_id)})
    
    if result.deleted_count > 0:
        return {"message": "User deleted successfully"}, 200
    return {"error": "Failed to delete user"}, 500