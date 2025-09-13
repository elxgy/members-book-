from backend.app.utils.database import validate_values_collection, members_info_collection
from backend.app.models.validate_values import ValidateValues
from backend.app.models.deal import Deal
from bson import ObjectId
import uuid
from datetime import datetime

def submit_new_deal(user_id: str, deal_data: dict):
    deal_id = str(uuid.uuid4())
    deal_data['deal_id'] = deal_id

    validation_request = ValidateValues(
        user_id=user_id,
        request_type='new_deal',
        data=deal_data
    )
    validate_values_collection.insert_one(validation_request.dict(by_alias=True))
    return {"message": "New deal submission received and is pending approval.", "deal_id": deal_id}, 200

def submit_update_deal(user_id: str, deal_id: str, update_data: dict):
    # First, check if a deal with this ID exists for the user
    member_info = members_info_collection.find_one({"user_id": user_id, "deals.deal_id": deal_id})
    if not member_info:
        return {"error": "Deal not found"}, 404

    update_data['deal_id'] = deal_id
    validation_request = ValidateValues(
        user_id=user_id,
        request_type='update_deal',
        data=update_data
    )
    validate_values_collection.insert_one(validation_request.dict(by_alias=True))
    return {"message": "Deal update submission received and is pending approval."}, 200

def get_pending_requests():
    requests = validate_values_collection.find({"status": "pending"})
    return [{**req, '_id': str(req['_id'])} for req in requests], 200

def approve_request(request_id: str):
    request = validate_values_collection.find_one({"_id": ObjectId(request_id)})
    if not request:
        return {"error": "Request not found"}, 404

    if request['status'] != 'pending':
        return {"error": "Request is not pending"}, 400

    user_id = request['user_id']
    data = request['data']
    
    if request['request_type'] == 'new_deal':
        deal = Deal(**data)
        members_info_collection.update_one(
            {"user_id": user_id},
            {"$push": {"deals": deal.dict()}}
        )
    elif request['request_type'] == 'update_deal':
        deal_id = data['deal_id']
        update_fields = {f"deals.$[elem].{key}": value for key, value in data.items()}
        members_info_collection.update_one(
            {"user_id": user_id, "deals.deal_id": deal_id},
            {"$set": update_fields},
            array_filters=[{"elem.deal_id": deal_id}]
        )

    validate_values_collection.update_one(
        {"_id": ObjectId(request_id)},
        {"$set": {"status": "approved", "updated_at": datetime.utcnow()}}
    )

    return {"message": "Request approved successfully"}, 200

def reject_request(request_id: str):
    request = validate_values_collection.find_one({"_id": ObjectId(request_id)})
    if not request:
        return {"error": "Request not found"}, 404

    if request['status'] != 'pending':
        return {"error": "Request is not pending"}, 400

    validate_values_collection.update_one(
        {"_id": ObjectId(request_id)},
        {"$set": {"status": "rejected", "updated_at": datetime.utcnow()}}
    )

    return {"message": "Request rejected successfully"}, 200