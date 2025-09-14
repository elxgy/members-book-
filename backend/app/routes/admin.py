from flask import Blueprint, request, jsonify
from app.services import admin_service, validation_service
from app.utils.security import token_required
from app.utils.permissions import permission_required, Role

admin_bp = Blueprint('admin_bp', __name__)

@admin_bp.route('/members', methods=['GET'])
@token_required
@permission_required(Role.ADMIN)
def manage_members(current_user):
    users = admin_service.get_all_users()
    return jsonify(users)

@admin_bp.route('/members/<string:id>/tier', methods=['PUT'])
@token_required
@permission_required(Role.ADMIN)
def update_member_tier(current_user, id):
    data = request.get_json()
    response = admin_service.update_user_tier(id, data['tier'])
    return jsonify(response)

@admin_bp.route('/validations/pending', methods=['GET'])
@token_required
@permission_required(Role.ADMIN)
def get_pending_validations(current_user):
    response, status_code = validation_service.get_pending_requests()
    return jsonify(response), status_code

@admin_bp.route('/validations/<string:request_id>/approve', methods=['POST'])
@token_required
@permission_required(Role.ADMIN)
def approve_validation(current_user, request_id):
    response, status_code = validation_service.approve_request(request_id)
    return jsonify(response), status_code

@admin_bp.route('/validations/<string:request_id>/reject', methods=['POST'])
@token_required
@permission_required(Role.ADMIN)
def reject_validation(current_user, request_id):
    response, status_code = validation_service.reject_request(request_id)
    return jsonify(response), status_code

@admin_bp.route('/members', methods=['POST'])
@token_required
@permission_required(Role.ADMIN)
def create_user(current_user):
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    required_fields = ['name', 'email']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    response, status_code = admin_service.create_user(data)
    return jsonify(response), status_code

@admin_bp.route('/members/<string:user_id>', methods=['PUT'])
@token_required
@permission_required(Role.ADMIN)
def update_user(current_user, user_id):
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    response, status_code = admin_service.update_user(user_id, data)
    return jsonify(response), status_code

@admin_bp.route('/members/<string:user_id>', methods=['DELETE'])
@token_required
@permission_required(Role.ADMIN)
def delete_user(current_user, user_id):
    response, status_code = admin_service.delete_user(user_id)
    return jsonify(response), status_code
