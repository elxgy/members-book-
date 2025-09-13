from flask import Blueprint, request, jsonify
from backend.app.services import validation_service
from backend.app.utils.security import token_required
from backend.app.utils.permissions import permission_required, Role

deals_bp = Blueprint('deals_bp', __name__)

@deals_bp.route('/new', methods=['POST'])
@token_required
@permission_required(Role.MEMBER)
def submit_new_deal_route(current_user):
    data = request.get_json()
    user_id = current_user['_id']
    response, status_code = validation_service.submit_new_deal(user_id, data)
    return jsonify(response), status_code

@deals_bp.route('/<string:deal_id>/update', methods=['PUT'])
@token_required
@permission_required(Role.MEMBER)
def submit_update_deal_route(current_user, deal_id):
    data = request.get_json()
    user_id = current_user['_id']
    response, status_code = validation_service.submit_update_deal(user_id, deal_id, data)
    return jsonify(response), status_code
