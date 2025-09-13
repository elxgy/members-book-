from flask import Blueprint, jsonify
from backend.app.services import ai_service
from backend.app.utils.security import token_required
from backend.app.utils.permissions import permission_required, Role

ai_bp = Blueprint('ai_bp', __name__)

@ai_bp.route('/recommendations', methods=['GET'])
@token_required
@permission_required(Role.MEMBER)
def get_recommendations(current_user):
    recommendations = ai_service.get_recommendations(current_user['public_id'])
    return jsonify(recommendations)

@ai_bp.route('/profile/optimize', methods=['POST'])
@token_required
@permission_required(Role.MEMBER)
def optimize_profile(current_user):
    response = ai_service.optimize_profile(current_user['public_id'])
    return jsonify(response)