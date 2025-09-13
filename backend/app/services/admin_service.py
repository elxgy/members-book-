from backend.app.utils.database import members_collection
from bson import ObjectId

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