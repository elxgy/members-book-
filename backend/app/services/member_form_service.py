from backend.app.services import ai_service
from backend.app.utils.database import members_collection
from bson import ObjectId

def submit_form_and_generate_bio(member_id, form_data):
    bio = ai_service.generate_bio(form_data)
    if bio:
        members_collection.update_one(
            {"_id": ObjectId(member_id)},
            {"$set": {"bio": bio}}
        )
        return {"message": "Bio generated and updated successfully", "bio": bio}
    return {"error": "Failed to generate bio"}, 500
