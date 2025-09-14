from backend.app.utils.database import value_requests_collection, members_collection
from backend.app.models.value_request import RequestType, RequestStatus
from bson import ObjectId
from datetime import datetime
from typing import Dict, Any, Tuple

def create_request(data: Dict[str, Any]) -> Tuple[Dict[str, Any], int]:
    """Create a new value request"""
    try:
        # Validate required fields
        required_fields = ['member_id', 'request_type', 'justification']
        for field in required_fields:
            if field not in data:
                return {"error": f"Missing required field: {field}"}, 400
        
        # Validate request type
        if data['request_type'] not in [rt.value for rt in RequestType]:
            return {"error": "Invalid request type"}, 400
        
        # Validate that member exists
        member = members_collection.find_one({"_id": ObjectId(data['member_id'])})
        if not member:
            return {"error": "Member not found"}, 404
        
        # Check for existing pending requests from this member
        existing_request = value_requests_collection.find_one({
            "member_id": ObjectId(data['member_id']),
            "status": RequestStatus.PENDING.value
        })
        if existing_request:
            return {"error": "You already have a pending value request. Please wait for it to be processed."}, 400
        
        # Validate request data based on type
        request_type = data['request_type']
        if request_type in ['deal_count', 'both']:
            if 'requested_deal_count' not in data:
                return {"error": "Requested deal count is required for this request type"}, 400
            try:
                requested_count = int(data['requested_deal_count'])
                if requested_count < 0:
                    return {"error": "Deal count must be non-negative"}, 400
            except (ValueError, TypeError):
                return {"error": "Invalid deal count format"}, 400
        
        if request_type in ['deal_value', 'both']:
            if 'requested_deal_value' not in data:
                return {"error": "Requested deal value is required for this request type"}, 400
            try:
                requested_value = float(data['requested_deal_value'])
                if requested_value < 0:
                    return {"error": "Deal value must be non-negative"}, 400
            except (ValueError, TypeError):
                return {"error": "Invalid deal value format"}, 400
        
        # Get current values from member profile
        current_deal_count = member.get('number_of_deals', 0)
        current_deal_value = member.get('total_deal_value', 0.0)
        
        # Create value request document
        request_doc = {
            "member_id": ObjectId(data['member_id']),
            "request_type": data['request_type'],
            "current_deal_count": current_deal_count,
            "requested_deal_count": data.get('requested_deal_count'),
            "current_deal_value": current_deal_value,
            "requested_deal_value": data.get('requested_deal_value'),
            "justification": data['justification'],
            "verified": False,
            "status": RequestStatus.PENDING.value,
            "admin_notes": None,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "verified_at": None,
            "verified_by": None
        }
        
        # Insert the request
        result = value_requests_collection.insert_one(request_doc)
        
        if result.inserted_id:
            return {
                "message": "Value request submitted successfully",
                "request_id": str(result.inserted_id)
            }, 201
        else:
            return {"error": "Failed to create request"}, 500
            
    except Exception as e:
        return {"error": f"Failed to create value request: {str(e)}"}, 500

def get_all_requests() -> Tuple[Dict[str, Any], int]:
    """Get all value requests for admin review"""
    try:
        requests = value_requests_collection.find().sort("created_at", -1)
        request_list = []
        
        for req in requests:
            # Get member info
            member = members_collection.find_one({"_id": req['member_id']})
            member_name = member.get('name', 'Unknown') if member else 'Unknown'
            
            request_data = {
                "_id": str(req['_id']),
                "member_id": str(req['member_id']),
                "member_name": member_name,
                "request_type": req['request_type'],
                "current_deal_count": req.get('current_deal_count'),
                "requested_deal_count": req.get('requested_deal_count'),
                "current_deal_value": req.get('current_deal_value'),
                "requested_deal_value": req.get('requested_deal_value'),
                "justification": req['justification'],
                "verified": req['verified'],
                "status": req['status'],
                "admin_notes": req.get('admin_notes'),
                "created_at": req['created_at'].isoformat(),
                "updated_at": req['updated_at'].isoformat(),
                "verified_at": req['verified_at'].isoformat() if req.get('verified_at') else None,
                "verified_by": str(req['verified_by']) if req.get('verified_by') else None
            }
            request_list.append(request_data)
        
        return {"requests": request_list}, 200
        
    except Exception as e:
        return {"error": f"Failed to retrieve requests: {str(e)}"}, 500

def get_pending_requests() -> Tuple[Dict[str, Any], int]:
    """Get all pending value requests"""
    try:
        requests = value_requests_collection.find({"status": RequestStatus.PENDING.value}).sort("created_at", -1)
        request_list = []
        
        for req in requests:
            # Get member info
            member = members_collection.find_one({"_id": req['member_id']})
            member_name = member.get('name', 'Unknown') if member else 'Unknown'
            
            request_data = {
                "_id": str(req['_id']),
                "member_id": str(req['member_id']),
                "member_name": member_name,
                "request_type": req['request_type'],
                "current_deal_count": req.get('current_deal_count'),
                "requested_deal_count": req.get('requested_deal_count'),
                "current_deal_value": req.get('current_deal_value'),
                "requested_deal_value": req.get('requested_deal_value'),
                "justification": req['justification'],
                "created_at": req['created_at'].isoformat(),
                "updated_at": req['updated_at'].isoformat()
            }
            request_list.append(request_data)
        
        return {"requests": request_list}, 200
        
    except Exception as e:
        return {"error": f"Failed to retrieve pending requests: {str(e)}"}, 500

def verify_request(request_id: str, data: Dict[str, Any]) -> Tuple[Dict[str, Any], int]:
    """Verify or reject a value request"""
    try:
        # Validate required fields
        if 'verified' not in data:
            return {"error": "Verification status is required"}, 400
        
        # Find the request
        request_doc = value_requests_collection.find_one({"_id": ObjectId(request_id)})
        if not request_doc:
            return {"error": "Request not found"}, 404
        
        # Check if already processed
        if request_doc['status'] != RequestStatus.PENDING.value:
            return {"error": "Request has already been processed"}, 400
        
        # Prepare update data
        update_data = {
            "verified": data['verified'],
            "status": RequestStatus.APPROVED.value if data['verified'] else RequestStatus.REJECTED.value,
            "admin_notes": data.get('admin_notes', ''),
            "verified_at": datetime.utcnow(),
            "verified_by": ObjectId(data['verified_by']),
            "updated_at": datetime.utcnow()
        }
        
        # Update the request
        result = value_requests_collection.update_one(
            {"_id": ObjectId(request_id)},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            return {"error": "Request not found"}, 404
        
        # If approved, update member's profile
        if data['verified']:
            member_update = {}
            if request_doc.get('requested_deal_count') is not None:
                member_update['number_of_deals'] = request_doc['requested_deal_count']
            if request_doc.get('requested_deal_value') is not None:
                member_update['total_deal_value'] = request_doc['requested_deal_value']
            
            if member_update:
                member_update['updated_at'] = datetime.utcnow()
                members_collection.update_one(
                    {"_id": request_doc['member_id']},
                    {"$set": member_update}
                )
        
        status_text = "approved" if data['verified'] else "rejected"
        return {"message": f"Request {status_text} successfully"}, 200
        
    except Exception as e:
        return {"error": f"Failed to verify request: {str(e)}"}, 500

def get_member_requests(member_id: str) -> Tuple[Dict[str, Any], int]:
    """Get all requests for a specific member"""
    try:
        requests = value_requests_collection.find({"member_id": ObjectId(member_id)}).sort("created_at", -1)
        request_list = []
        
        for req in requests:
            request_data = {
                "_id": str(req['_id']),
                "request_type": req['request_type'],
                "current_deal_count": req.get('current_deal_count'),
                "requested_deal_count": req.get('requested_deal_count'),
                "current_deal_value": req.get('current_deal_value'),
                "requested_deal_value": req.get('requested_deal_value'),
                "justification": req['justification'],
                "verified": req['verified'],
                "status": req['status'],
                "admin_notes": req.get('admin_notes'),
                "created_at": req['created_at'].isoformat(),
                "updated_at": req['updated_at'].isoformat(),
                "verified_at": req['verified_at'].isoformat() if req.get('verified_at') else None
            }
            request_list.append(request_data)
        
        return {"requests": request_list}, 200
        
    except Exception as e:
        return {"error": f"Failed to retrieve member requests: {str(e)}"}, 500

def get_request_details(request_id: str, user_id: str, user_type: str) -> Tuple[Dict[str, Any], int]:
    """Get details of a specific request"""
    try:
        request_doc = value_requests_collection.find_one({"_id": ObjectId(request_id)})
        if not request_doc:
            return {"error": "Request not found"}, 404
        
        # Check permissions - members can only see their own requests
        if user_type != 'admin' and str(request_doc['member_id']) != user_id:
            return {"error": "Access denied"}, 403
        
        # Get member info if admin
        member_name = None
        if user_type == 'admin':
            member = members_collection.find_one({"_id": request_doc['member_id']})
            member_name = member.get('name', 'Unknown') if member else 'Unknown'
        
        request_data = {
            "_id": str(request_doc['_id']),
            "member_id": str(request_doc['member_id']),
            "request_type": request_doc['request_type'],
            "current_deal_count": request_doc.get('current_deal_count'),
            "requested_deal_count": request_doc.get('requested_deal_count'),
            "current_deal_value": request_doc.get('current_deal_value'),
            "requested_deal_value": request_doc.get('requested_deal_value'),
            "justification": request_doc['justification'],
            "verified": request_doc['verified'],
            "status": request_doc['status'],
            "admin_notes": request_doc.get('admin_notes'),
            "created_at": request_doc['created_at'].isoformat(),
            "updated_at": request_doc['updated_at'].isoformat(),
            "verified_at": request_doc['verified_at'].isoformat() if request_doc.get('verified_at') else None,
            "verified_by": str(request_doc['verified_by']) if request_doc.get('verified_by') else None
        }
        
        if member_name:
            request_data['member_name'] = member_name
        
        return request_data, 200
        
    except Exception as e:
        return {"error": f"Failed to retrieve request details: {str(e)}"}, 500