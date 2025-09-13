from backend.app.models.message import Message
from backend.app.utils.database import messages_collection
from bson import ObjectId

def send_message(data):
    new_message = Message(
        sender_id=data['sender_id'],
        receiver_id=data['receiver_id'],
        content=data['content'],
        status='sent'
    )
    result = messages_collection.insert_one(new_message.dict(by_alias=True, exclude_none=True))
    return {"message": "Message sent successfully", "message_id": str(result.inserted_id)}

def get_conversation(user1_id, user2_id):
    messages = messages_collection.find({
        "$or": [
            {"sender_id": user1_id, "receiver_id": user2_id},
            {"sender_id": user2_id, "receiver_id": user1_id}
        ]
    }).sort("created_at", 1)
    return [{**message, '_id': str(message['_id'])} for message in messages]