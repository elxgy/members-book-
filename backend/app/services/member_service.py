from backend.app.utils.database import members_collection
from bson import ObjectId

def get_all_members():
    members = members_collection.find()
    return [{**member, '_id': str(member['_id'])} for member in members]

def get_member_by_id(member_id):
    member = members_collection.find_one({"_id": ObjectId(member_id)})
    if member:
        member['_id'] = str(member['_id'])
    return member