from flask import Blueprint, jsonify

members_bp = Blueprint('members_bp', __name__)

@members_bp.route('/', methods=['GET'])
def get_members():
    return jsonify([{'id': 1, 'name': 'John Doe'}])

@members_bp.route('/<int:id>', methods=['GET'])
def get_member(id):
    return jsonify({'id': id, 'name': 'John Doe'})

@members_bp.route('/<int:id>', methods=['PUT'])
def update_member(id):
    return jsonify({'message': f'Member {id} updated'})

@members_bp.route('/search', methods=['GET'])
def search_members():
    return jsonify([{'id': 1, 'name': 'John Doe'}])
