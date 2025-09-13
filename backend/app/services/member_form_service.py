from backend.app.utils.database import members_collection, members_info_collection
from backend.app.models.member_info import MemberInfo
from bson import ObjectId
from datetime import datetime
from pydantic import ValidationError

def submit_form(member_id, form_data):
    try:
        member_info_data = MemberInfo(
            user_id=member_id,
            **form_data
        )
        
        update_data = member_info_data.dict(exclude_unset=True)
        update_data["updated_at"] = datetime.utcnow()

        existing_member_info = members_info_collection.find_one({"user_id": member_id})
        if existing_member_info:
            members_info_collection.update_one(
                {"_id": existing_member_info["_id"]},
                {"$set": update_data}
            )
            print(f"Member info for user {member_id} updated.")
        else:
            update_data["created_at"] = datetime.utcnow()
            members_info_collection.insert_one(update_data)
            print(f"Member info for user {member_id} created.")

        return {"message": "Form submitted successfully"}, 200

    except ValidationError as e:
        return {"error": e.errors()}, 400
    except Exception as e:
        return {"error": str(e)}, 500
