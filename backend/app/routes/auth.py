from flask import Blueprint, request, jsonify
from backend.app.services import auth_service

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
    return jsonify({'message': 'Token refreshed'})

@auth_bp.route('/logout', methods=['POST'])
def logout():
    # This would typically involve blacklisting the token
    return jsonify({'message': 'Logout successful'})