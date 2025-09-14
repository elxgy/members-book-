from flask import Blueprint, request, jsonify
from app.services import auth_service
from app.utils.security import token_required

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    response, status_code = auth_service.login_user(data)
    return jsonify(response), status_code

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    response, status_code = auth_service.register_user(data)
    return jsonify(response), status_code

@auth_bp.route('/refresh', methods=['POST'])
def refresh():
    # This would typically involve a refresh token
    # For now, return a placeholder response with correct field name
    return jsonify({'access_token': 'refreshed_token', 'message': 'Token refreshed'})

@auth_bp.route('/logout', methods=['POST'])
def logout():
    # This would typically involve blacklisting the token
    return jsonify({'message': 'Logout successful'})

@auth_bp.route('/guest-login', methods=['POST'])
def guest_login():
    """Guest login endpoint - no credentials required"""
    response, status_code = auth_service.guest_login()
    return jsonify(response), status_code

@auth_bp.route('/validate', methods=['POST'])
@token_required
def validate(current_user):
    return jsonify({"message": "Token is valid"}), 200
