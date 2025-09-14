from flask import Blueprint, request, jsonify
from backend.app.services import value_request_service
from backend.app.utils.security import token_required
from backend.app.utils.permissions import permission_required, Role

value_requests_bp = Blueprint('value_requests_bp', __name__)

@value_requests_bp.route('/', methods=['POST'])
@token_required
@permission_required(Role.MEMBER)
def create_value_request(current_user):
    """Create a new value request for deal value/count alteration"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Add member_id from current user
        data['member_id'] = current_user['public_id']
        
        response, status_code = value_request_service.create_request(data)
        return jsonify(response), status_code
        
    except Exception as e:
        return jsonify({"error": "Failed to create value request"}), 500

@value_requests_bp.route('/', methods=['GET'])
@token_required
@permission_required(Role.ADMIN)
def get_all_value_requests(current_user):
    """Get all value requests for admin review"""
    try:
        response, status_code = value_request_service.get_all_requests()
        return jsonify(response), status_code
        
    except Exception as e:
        return jsonify({"error": "Failed to retrieve value requests"}), 500

@value_requests_bp.route('/<string:request_id>/verify', methods=['PUT'])
@token_required
@permission_required(Role.ADMIN)
def verify_value_request(current_user, request_id):
    """Verify or reject a value request"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Add admin info
        data['verified_by'] = current_user['public_id']
        
        response, status_code = value_request_service.verify_request(request_id, data)
        return jsonify(response), status_code
        
    except Exception as e:
        return jsonify({"error": "Failed to verify value request"}), 500

@value_requests_bp.route('/my-requests', methods=['GET'])
@token_required
@permission_required(Role.MEMBER)
def get_my_value_requests(current_user):
    """Get current user's value requests"""
    try:
        response, status_code = value_request_service.get_member_requests(current_user['public_id'])
        return jsonify(response), status_code
        
    except Exception as e:
        return jsonify({"error": "Failed to retrieve your value requests"}), 500

@value_requests_bp.route('/<string:request_id>', methods=['GET'])
@token_required
@permission_required(Role.MEMBER)
def get_value_request_details(current_user, request_id):
    """Get details of a specific value request"""
    try:
        response, status_code = value_request_service.get_request_details(request_id, current_user['public_id'], current_user['role'])
        return jsonify(response), status_code
        
    except Exception as e:
        return jsonify({"error": "Failed to retrieve value request details"}), 500

@value_requests_bp.route('/pending', methods=['GET'])
@token_required
@permission_required(Role.ADMIN)
def get_pending_value_requests(current_user):
    """Get all pending value requests for admin review"""
    try:
        response, status_code = value_request_service.get_pending_requests()
        return jsonify(response), status_code
        
    except Exception as e:
        return jsonify({"error": "Failed to retrieve pending value requests"}), 500