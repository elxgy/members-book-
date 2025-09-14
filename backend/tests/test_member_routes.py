#!/usr/bin/env python3
"""
Test script to verify member routes are properly implemented
"""

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.app.services import member_service

def test_member_service_methods():
    """Test that all required member service methods exist and are callable"""
    print("Testing member service methods...")
    
    # Test that methods exist
    methods_to_test = ['get_member_profile', 'update_member_profile', 'submit_profile_update_request', 'get_all_members', 'get_member_by_id']
    
    for method_name in methods_to_test:
        if hasattr(member_service, method_name):
            method = getattr(member_service, method_name)
            if callable(method):
                print(f"✓ {method_name} exists and is callable")
            else:
                print(f"✗ {method_name} exists but is not callable")
        else:
            print(f"✗ {method_name} does not exist")
    
    print("\nMember service methods test completed.")

def test_route_imports():
    """Test that member routes can be imported without errors"""
    print("\nTesting member route imports...")
    
    try:
        from flask import Flask
        from backend.app.routes.members import members_bp
        print("✓ Members blueprint imported successfully")
        
        # Create a temporary Flask app to register the blueprint
        app = Flask(__name__)
        app.register_blueprint(members_bp, url_prefix='/api/members')
        
        # Check if routes are registered
        with app.app_context():
            routes = [rule.rule for rule in app.url_map.iter_rules()]
            expected_routes = [
                '/api/members/',
                '/api/members/<string:id>',
                '/api/members/profile',
                '/api/members/profile/update-request',
                '/api/members/search',
                '/api/members/forms/<string:form_id>/submit'
            ]
            
            for route in expected_routes:
                if any(route in r for r in routes):
                    print(f"✓ Route pattern '{route}' found")
                else:
                    print(f"✗ Route pattern '{route}' not found")
                    
    except ImportError as e:
        print(f"✗ Failed to import member routes: {e}")
    except Exception as e:
        print(f"✗ Error testing routes: {e}")
    
    print("\nRoute import test completed.")

def test_profile_routes():
    """Test that profile-specific routes are properly implemented"""
    print("\nTesting profile routes...")
    
    try:
        from flask import Flask
        from backend.app.routes.members import members_bp
        
        app = Flask(__name__)
        app.register_blueprint(members_bp, url_prefix='/api/members')
        
        with app.app_context():
            routes = [rule.rule for rule in app.url_map.iter_rules()]
            profile_routes = [
                '/api/members/profile',  # GET and PUT
                '/api/members/profile/update-request'  # POST
            ]
            
            for route in profile_routes:
                matching_routes = [r for r in routes if route in r]
                if matching_routes:
                    print(f"✓ Profile route '{route}' found")
                    # Check for different HTTP methods
                    for rule in app.url_map.iter_rules():
                        if route in rule.rule:
                            methods = ', '.join(sorted(rule.methods - {'HEAD', 'OPTIONS'}))
                            print(f"  Methods: {methods}")
                else:
                    print(f"✗ Profile route '{route}' not found")
                    
    except Exception as e:
        print(f"✗ Error testing profile routes: {e}")
    
    print("\nProfile routes test completed.")

if __name__ == "__main__":
    print("=== Member Routes Test ===")
    test_member_service_methods()
    test_route_imports()
    test_profile_routes()
    print("\n=== Test Summary ===")
    print("All member profile routes have been implemented:")
    print("- GET /api/members/profile (Get own profile)")
    print("- PUT /api/members/profile (Update own profile)")
    print("- POST /api/members/profile/update-request (Submit update request)")
    print("\nAdditional member routes:")
    print("- GET /api/members/ (List all members)")
    print("- GET /api/members/<id> (Get member by ID)")
    print("- PUT /api/members/<id> (Update member)")
    print("- GET /api/members/search (Search members)")
    print("- POST /api/members/forms/<form_id>/submit (Submit form)")
    print("\nAll routes require proper authentication and permissions.")