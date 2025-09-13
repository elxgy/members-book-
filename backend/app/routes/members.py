from flask import Blueprint, jsonify
from backend.app.services import member_service, member_form_service

members_bp = Blueprint('members_bp', __name__)

@members_bp.route('/', methods=['GET'])
def get_members():
    members = member_service.get_all_members()
    return jsonify(members)

@members_bp.route('/<string:id>', methods=['GET'])
def get_member(id):
    member = member_service.get_member_by_id(id)
    if member:
        return jsonify(member)
    return jsonify({"error": "Member not found"}), 404

@members_bp.route('/<string:id>', methods=['PUT'])
def update_member(id):
    # Placeholder for updating a member
    return jsonify({'message': f'Member {id} updated'})

@members_bp.route('/search', methods=['GET'])
def search_members():
    # Placeholder for searching members
    return jsonify([{'id': 1, 'name': 'John Doe'}])

@members_bp.route('/forms/<string:form_id>/submit', methods=['POST'])
def submit_form(form_id):
    data = request.get_json()
    # Assuming the member_id is passed in the request data for now
    member_id = data.get('member_id')
    if not member_id:
        return jsonify({"error": "Member ID is required"}), 400
    response, status_code = member_form_service.submit_form_and_generate_bio(member_id, data)
    return jsonify(response), status_code