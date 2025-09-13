from flask import Blueprint, request, jsonify

forms_bp = Blueprint('forms_bp', __name__)

@forms_bp.route('/', methods=['POST'])
def create_form():
    return jsonify({'message': 'Form created successfully'})

@forms_bp.route('/', methods=['GET'])
def get_forms():
    return jsonify([{'id': 1, 'name': 'New Member Form'}])

@forms_bp.route('/<string:id>', methods=['GET'])
def get_form(id):
    return jsonify({'id': id, 'name': 'New Member Form'})

@forms_bp.route('/<string:id>', methods=['PUT'])
def update_form(id):
    return jsonify({'message': f'Form {id} updated'})

@forms_bp.route('/<string:id>', methods=['DELETE'])
def delete_form(id):
    return jsonify({'message': f'Form {id} deleted'})
