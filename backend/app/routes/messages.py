from flask import Blueprint, request, jsonify
from backend.app.services import message_service
from backend.app.utils.security import token_required
from backend.app.utils.permissions import permission_required, Role

messages_bp = Blueprint('messages_bp', __name__)

@messages_bp.route('/', methods=['POST'])
@token_required
@permission_required(Role.MEMBER)
def send_message(current_user):
    data = request.get_json()
    data['sender_id'] = current_user['public_id']
    response = message_service.send_message(data)
    return jsonify(response)

@messages_bp.route('/conversation/<string:user_id>', methods=['GET'])
@token_required
@permission_required(Role.MEMBER)
def get_conversation(current_user, user_id):
    messages = message_service.get_conversation(current_user['public_id'], user_id)
    return jsonify(messages)

@messages_bp.route('/<string:id>/read', methods=['PUT'])
@token_required
@permission_required(Role.MEMBER)
def mark_as_read(current_user, id):
    # Placeholder for marking a message as read
    return jsonify({'message': f'Message {id} marked as read'})

@messages_bp.route('/unread', methods=['GET'])
@token_required
@permission_required(Role.MEMBER)
def get_unread_count(current_user):
    # Placeholder for getting unread count
    return jsonify({'unread_count': 5})