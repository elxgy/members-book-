from flask import Blueprint, request, jsonify
from backend.app.services import admin_service
from backend.app.utils.security import token_required
from backend.app.utils.permissions import permission_required, Role

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