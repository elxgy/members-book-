from flask import Blueprint, jsonify
from backend.app.services import ai_service
from backend.app.utils.security import token_required

ai_bp = Blueprint('ai_bp', __name__)

@ai_bp.route('/recommendations', methods=['GET'])
@token_required
def get_recommendations(current_user):
    recommendations = ai_service.get_recommendations(current_user)
    return jsonify(recommendations)

@ai_bp.route('/profile/optimize', methods=['POST'])
@token_required
def optimize_profile(current_user):
    response = ai_service.optimize_profile(current_user)
    return jsonify(response)