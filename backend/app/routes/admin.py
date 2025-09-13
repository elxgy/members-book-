from flask import Blueprint, jsonify

admin_bp = Blueprint('admin_bp', __name__)

@admin_bp.route('/members', methods=['GET'])
def manage_members():
    return jsonify([{'id': 1, 'name': 'John Doe'}])

@admin_bp.route('/members/<int:id>/tier', methods=['PUT'])
def update_member_tier(id):
    return jsonify({'message': f'Member {id} tier updated'})
