from backend.app.utils.database import members_collection, update_requests_collection
from bson import ObjectId
from datetime import datetime

def get_all_members():
    members = members_collection.find()
    return [{**member, '_id': str(member['_id'])} for member in members]

def get_member_by_id(member_id):
    member = members_collection.find_one({"_id": ObjectId(member_id)})
    if member:
        member['_id'] = str(member['_id'])
    return member

def update_member_profile(member_id, update_data):
    """Update member profile with validated data"""
    try:
        # Remove any fields that shouldn't be updated directly
        allowed_fields = ['description', 'total_deal_value', 'number_of_deals', 'industry', 'location']
        filtered_data = {k: v for k, v in update_data.items() if k in allowed_fields}
        
        if not filtered_data:
            return {"error": "No valid fields to update"}, 400
        
        # Add timestamp
        filtered_data['updated_at'] = datetime.utcnow()
        
        # Update the member
        result = members_collection.update_one(
            {"_id": ObjectId(member_id)},
            {"$set": filtered_data}
        )
        
        if result.matched_count == 0:
            return {"error": "Member not found"}, 404
        
        if result.modified_count == 0:
            return {"message": "No changes made"}, 200
        
        return {"message": "Profile updated successfully"}, 200
        
    except Exception as e:
        return {"error": f"Failed to update profile: {str(e)}"}, 500

def submit_update_request(request_data):
    """Submit a profile update request for admin approval"""
    try:
        # Create update request document
        request_doc = {
            "user_id": request_data['user_id'],
            "request_type": request_data['request_type'],
            "requested_changes": {k: v for k, v in request_data.items() 
                                if k not in ['user_id', 'request_type']},
            "status": "pending",
            "created_at": datetime.utcnow(),
            "reviewed_at": None,
            "reviewed_by": None
        }
        
        # Insert the request
        result = update_requests_collection.insert_one(request_doc)
        
        if result.inserted_id:
            return {
                "message": "Update request submitted successfully",
                "request_id": str(result.inserted_id)
            }, 201
        else:
            return {"error": "Failed to submit request"}, 500
            
    except Exception as e:
        return {"error": f"Failed to submit update request: {str(e)}"}, 500

# Guest-specific service methods
def get_public_showcases():
    """Get public member showcases for guest viewing (verified members only)"""
    try:
        # Get only verified/approved members with public information
        showcases = members_collection.find(
            {"verified": True, "public_profile": True},
            {
                "_id": 1,
                "name": 1,
                "company": 1,
                "sector": 1,
                "hierarchy": 1,
                "description": 1,
                "profile_image": 1,
                "expertise": 1,
                "location": 1,
                "connections": 1
                # Exclude private fields like email, phone, etc.
            }
        )
        return [{**showcase, '_id': str(showcase['_id'])} for showcase in showcases]
    except Exception as e:
        raise Exception(f"Failed to get public showcases: {str(e)}")

def get_business_segments():
    """Get available business segments"""
    try:
        # Get distinct sectors from verified members
        segments = members_collection.distinct("sector", {"verified": True})
        # Filter out None/empty values and return sorted list
        segments = [segment for segment in segments if segment]
        return sorted(segments)
    except Exception as e:
        raise Exception(f"Failed to get business segments: {str(e)}")

def get_showcases_by_segment(segment):
    """Get member showcases filtered by business segment"""
    try:
        # Get verified members in the specified segment
        showcases = members_collection.find(
            {
                "verified": True,
                "public_profile": True,
                "sector": segment
            },
            {
                "_id": 1,
                "name": 1,
                "company": 1,
                "sector": 1,
                "hierarchy": 1,
                "description": 1,
                "profile_image": 1,
                "expertise": 1,
                "location": 1,
                "connections": 1
                # Exclude private fields
            }
        )
        return [{**showcase, '_id': str(showcase['_id'])} for showcase in showcases]
    except Exception as e:
        raise Exception(f"Failed to get showcases by segment: {str(e)}")