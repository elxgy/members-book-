from flask import Blueprint, request, jsonify
from backend.app.utils.security import token_required
from backend.app.utils.permissions import permission_required, Role
from backend.app.services import form_service

forms_bp = Blueprint('forms_bp', __name__)

@forms_bp.route('/', methods=['POST'])
@token_required
@permission_required(Role.ADMIN)
def create_form(current_user):
    data = request.get_json()
    data['created_by'] = current_user['public_id']
    response = form_service.create_form(data)
    return jsonify(response)

@forms_bp.route('/', methods=['GET'])
@token_required
@permission_required(Role.ADMIN)
def get_forms(current_user):
    forms = form_service.get_all_forms()
    return jsonify(forms)

@forms_bp.route('/<string:id>', methods=['GET'])
@token_required
@permission_required(Role.ADMIN)
def get_form(current_user, id):
    form = form_service.get_form_by_id(id)
    if form:
        return jsonify(form)
    return jsonify({"message": "Form not found"}), 404

@forms_bp.route('/<string:id>', methods=['PUT'])
@token_required
@permission_required(Role.ADMIN)
def update_form(current_user, id):
    # Placeholder for updating a form
    return jsonify({'message': f'Form {id} updated'})

@forms_bp.route('/<string:id>', methods=['DELETE'])
@token_required
@permission_required(Role.ADMIN)
def delete_form(current_user, id):
    # Placeholder for deleting a form
    return jsonify({'message': f'Form {id} deleted'})