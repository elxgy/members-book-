from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    return jsonify({'message': 'Login successful'})

@auth_bp.route('/register', methods=['POST'])
def register():
    return jsonify({'message': 'Registration successful'})

@auth_bp.route('/refresh', methods=['POST'])
def refresh():
    return jsonify({'message': 'Token refreshed'})

@auth_bp.route('/logout', methods=['POST'])
def logout():
    return jsonify({'message': 'Logout successful'})
