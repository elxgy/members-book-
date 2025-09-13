from flask import Blueprint, jsonify

messages_bp = Blueprint('messages_bp', __name__)

@messages_bp.route('/', methods=['POST'])
def send_message():
    return jsonify({'message': 'Message sent'})

@messages_bp.route('/conversation/<int:user_id>', methods=['GET'])
def get_conversation(user_id):
    return jsonify([{'id': 1, 'content': 'Hello'}])

@messages_bp.route('/<int:id>/read', methods=['PUT'])
def mark_as_read(id):
    return jsonify({'message': f'Message {id} marked as read'})

@messages_bp.route('/unread', methods=['GET'])
def get_unread_count():
    return jsonify({'unread_count': 5})
