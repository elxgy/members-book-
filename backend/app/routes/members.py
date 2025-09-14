from flask import Blueprint, request, jsonify
from app.services import member_service, member_form_service, ai_description_service
from app.utils.security import token_required
from app.utils.permissions import permission_required, Role

members_bp = Blueprint('members_bp', __name__)

@members_bp.route('/', methods=['GET'])
@token_required
@permission_required(Role.GUEST)
def get_members(current_user):
    members = member_service.get_all_members()
    return jsonify(members)

@members_bp.route('/<string:id>', methods=['GET'])
@token_required
@permission_required(Role.MEMBER)
def get_member(current_user, id):
    member = member_service.get_member_by_id(id)
    if member:
        return jsonify(member)
    return jsonify({"error": "Member not found"}), 404

@members_bp.route('/<string:id>', methods=['PUT'])
@token_required
@permission_required(Role.MEMBER)
def update_member(current_user, id):
    # Placeholder for updating a member
    return jsonify({'message': f'Member {id} updated'})

@members_bp.route('/search', methods=['GET'])
@token_required
@permission_required(Role.MEMBER)
def search_members(current_user):
    # Placeholder for searching members
    return jsonify([{'id': 1, 'name': 'John Doe'}])

@members_bp.route('/forms/<string:form_id>/submit', methods=['POST'])
@token_required
@permission_required(Role.MEMBER)
def submit_form(current_user, form_id):
    data = request.get_json()
    # Assuming the member_id is passed in the request data for now
    member_id = data.get('member_id')
    if not member_id:
        return jsonify({"error": "Member ID is required"}), 400
    response, status_code = member_form_service.submit_form(member_id, data)
    return jsonify(response), status_code

@members_bp.route('/<string:user_id>/generate-description', methods=['POST'])
@token_required
@permission_required(Role.ADMIN)
def generate_description_route(current_user, user_id):
    response, status_code = ai_description_service.generate_description(user_id)
    return jsonify(response), status_code

# Guest-specific routes for viewing showcases and segments
@members_bp.route('/showcase', methods=['GET'])
@token_required
@permission_required(Role.GUEST)
def get_member_showcases(current_user):
    """Get public member profile showcases for guest viewing"""
    try:
        # Get only verified/approved member showcases with limited public information
        showcases = member_service.get_public_showcases()
        return jsonify(showcases)
    except Exception as e:
        return jsonify({"error": "Failed to retrieve showcases"}), 500

@members_bp.route('/segments', methods=['GET'])
@token_required
@permission_required(Role.GUEST)
def get_business_segments(current_user):
    """Get available business segments for guest viewing"""
    try:
        segments = member_service.get_business_segments()
        return jsonify(segments)
    except Exception as e:
        return jsonify({"error": "Failed to retrieve segments"}), 500

@members_bp.route('/showcase/<string:segment>', methods=['GET'])
@token_required
@permission_required(Role.GUEST)
def get_showcases_by_segment(current_user, segment):
    """Get member profile showcases filtered by business segment"""
    try:
        # Get showcases filtered by segment with public information only
        showcases = member_service.get_showcases_by_segment(segment)
        if showcases is not None:
            return jsonify(showcases)
        return jsonify({"error": "Invalid segment or no showcases found"}), 404
    except Exception as e:
        return jsonify({"error": "Failed to retrieve showcases for segment"}), 500

# User profile management routes
@members_bp.route('/profile', methods=['GET'])
@token_required
@permission_required(Role.MEMBER)
def get_own_profile(current_user):
    """Get current user's profile information"""
    try:
        profile = member_service.get_member_by_id(current_user.id)
        if profile:
            return jsonify(profile)
        return jsonify({"error": "Profile not found"}), 404
    except Exception as e:
        return jsonify({"error": "Failed to retrieve profile"}), 500

@members_bp.route('/profile', methods=['PUT'])
@token_required
@permission_required(Role.MEMBER)
def update_own_profile(current_user):
    """Update current user's profile information"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Validate description length
        if 'description' in data:
            description = data['description']
            if len(description) > 1000:
                return jsonify({"error": "Description must be 1000 characters or less"}), 400
        
        # Validate deal values
        if 'total_deal_value' in data:
            try:
                deal_value = float(data['total_deal_value'])
                if deal_value < 0:
                    return jsonify({"error": "Deal value must be positive"}), 400
            except (ValueError, TypeError):
                return jsonify({"error": "Invalid deal value format"}), 400
        
        # Validate number of deals
        if 'number_of_deals' in data:
            try:
                num_deals = int(data['number_of_deals'])
                if num_deals < 0:
                    return jsonify({"error": "Number of deals must be positive"}), 400
            except (ValueError, TypeError):
                return jsonify({"error": "Invalid number of deals format"}), 400
        
        # Update profile with validated data
        response, status_code = member_service.update_member_profile(current_user.id, data)
        return jsonify(response), status_code
        
    except Exception as e:
        return jsonify({"error": "Failed to update profile"}), 500

@members_bp.route('/profile/update-request', methods=['POST'])
@token_required
@permission_required(Role.MEMBER)
def submit_profile_update_request(current_user):
    """Submit a profile update request that requires admin approval"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Add user ID to the request
        data['user_id'] = current_user.id
        data['request_type'] = 'profile_update'
        
        # Validate the request data
        if 'description' in data and len(data['description']) > 1000:
            return jsonify({"error": "Description must be 1000 characters or less"}), 400
        
        if 'total_deal_value' in data:
            try:
                deal_value = float(data['total_deal_value'])
                if deal_value < 0:
                    return jsonify({"error": "Deal value must be positive"}), 400
            except (ValueError, TypeError):
                return jsonify({"error": "Invalid deal value format"}), 400
        
        if 'number_of_deals' in data:
            try:
                num_deals = int(data['number_of_deals'])
                if num_deals < 0:
                    return jsonify({"error": "Number of deals must be positive"}), 400
            except (ValueError, TypeError):
                return jsonify({"error": "Invalid number of deals format"}), 400
        
        # Submit the update request
        response, status_code = member_service.submit_update_request(data)
        return jsonify(response), status_code
        
    except Exception as e:
        return jsonify({"error": "Failed to submit update request"}), 500

@members_bp.route('/profile/update-request/<string:request_id>/approve', methods=['POST'])
@token_required
@permission_required(Role.ADMIN)
def approve_profile_update_request(current_user, request_id):
    """Approve a profile update request (admin only)"""
    try:
        # Call service method to approve the request
        response, status_code = member_service.approve_update_request(request_id, current_user.id)
        return jsonify(response), status_code
        
    except Exception as e:
        return jsonify({"error": "Failed to approve update request"}), 500

@members_bp.route('/profile/update-request/<string:request_id>/reject', methods=['POST'])
@token_required
@permission_required(Role.ADMIN)
def reject_profile_update_request(current_user, request_id):
    """Reject a profile update request (admin only)"""
    try:
        data = request.get_json() or {}
        rejection_reason = data.get('reason', '')
        
        # Call service method to reject the request
        response, status_code = member_service.reject_update_request(request_id, current_user.id, rejection_reason)
        return jsonify(response), status_code
        
    except Exception as e:
        return jsonify({"error": "Failed to reject update request"}), 500

@members_bp.route('/profile/update-requests', methods=['GET'])
@token_required
@permission_required(Role.ADMIN)
def get_pending_update_requests(current_user):
    """Get all pending profile update requests (admin only)"""
    try:
        # Call service method to get pending requests
        requests = member_service.get_pending_update_requests()
        return jsonify(requests), 200
        
    except Exception as e:
        return jsonify({"error": "Failed to retrieve pending update requests"}), 500
