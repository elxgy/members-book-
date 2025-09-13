from flask import Blueprint, jsonify, request
from backend.app.services import member_service, member_form_service, ai_description_service
from backend.app.utils.security import token_required
from backend.app.utils.permissions import permission_required, Role

members_bp = Blueprint('members_bp', __name__)

@members_bp.route('/', methods=['GET'])
@token_required
@permission_required(Role.GUEST)
def get_members(current_user):
    members = member_service.get_all_members()
    return jsonify(members)

@members_bp.route('/<string:id>', methods=['GET'])
@token_required
@permission_required(Role.MEMBER)
def get_member(current_user, id):
    member = member_service.get_member_by_id(id)
    if member:
        return jsonify(member)
    return jsonify({"error": "Member not found"}), 404

@members_bp.route('/<string:id>', methods=['PUT'])
@token_required
@permission_required(Role.MEMBER)
def update_member(current_user, id):
    # Placeholder for updating a member
    return jsonify({'message': f'Member {id} updated'})

@members_bp.route('/search', methods=['GET'])
@token_required
@permission_required(Role.MEMBER)
def search_members(current_user):
    # Placeholder for searching members
    return jsonify([{'id': 1, 'name': 'John Doe'}])

@members_bp.route('/forms/<string:form_id>/submit', methods=['POST'])
@token_required
@permission_required(Role.MEMBER)
def submit_form(current_user, form_id):
    data = request.get_json()
    # Assuming the member_id is passed in the request data for now
    member_id = data.get('member_id')
    if not member_id:
        return jsonify({"error": "Member ID is required"}), 400
    response, status_code = member_form_service.submit_form(member_id, data)
    return jsonify(response), status_code

@members_bp.route('/<string:user_id>/generate-description', methods=['POST'])
@token_required
@permission_required(Role.ADMIN)
def generate_description_route(current_user, user_id):
    response, status_code = ai_description_service.generate_description(user_id)
    return jsonify(response), status_code
