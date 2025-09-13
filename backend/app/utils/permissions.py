from functools import wraps
from flask import jsonify
from backend.app.models.member import Member

class Role:
    GUEST = "guest"
    MEMBER = "member"
    ADMIN = "admin"

def permission_required(required_role):
    def decorator(f):
        @wraps(f)
        def decorated_function(current_user, *args, **kwargs):
            user_role = current_user['role']

            if user_role == Role.ADMIN:
                return f(current_user, *args, **kwargs)
            if user_role == Role.MEMBER and required_role != Role.ADMIN:
                return f(current_user, *args, **kwargs)
            if user_role == Role.GUEST and required_role == Role.GUEST:
                return f(current_user, *args, **kwargs)
            
            return jsonify({"message": "Permission denied"}), 403
        return decorated_function
    return decorator
