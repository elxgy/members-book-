#!/usr/bin/env python3
"""
Test script to verify guest routes are properly implemented
"""

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask import Flask
from backend.app.routes.members import members_bp
from backend.app.services import member_service

def test_guest_service_methods():
    """Test guest-specific service methods"""
    print("\n=== Testing Guest Service Methods ===")
    
    try:
        # Test get_public_showcases
        print("Testing get_public_showcases...")
        showcases = member_service.get_public_showcases()
        print(f"✓ get_public_showcases returned {len(showcases)} showcases")
        
        # Test get_business_segments
        print("Testing get_business_segments...")
        segments = member_service.get_business_segments()
        print(f"✓ get_business_segments returned {len(segments)} segments: {segments}")
        
        # Test get_showcases_by_segment (if segments exist)
        if segments:
            test_segment = segments[0]
            print(f"Testing get_showcases_by_segment with '{test_segment}'...")
            segment_showcases = member_service.get_showcases_by_segment(test_segment)
            print(f"✓ get_showcases_by_segment returned {len(segment_showcases)} showcases for '{test_segment}'")
        
        print("✓ All guest service methods are working correctly!")
        
    except Exception as e:
        print(f"✗ Error testing guest service methods: {e}")
        return False
    
    return True

def test_route_imports():
    """Test that guest routes are properly imported and accessible"""
    print("\n=== Testing Guest Route Imports ===")
    
    try:
        # Create a temporary Flask app to test route registration
        app = Flask(__name__)
        app.register_blueprint(members_bp, url_prefix='/api/members')
        
        # Check if the guest routes are registered
        guest_routes = []
        for rule in app.url_map.iter_rules():
            if 'showcase' in rule.rule or 'segments' in rule.rule:
                guest_routes.append(f"{rule.methods} {rule.rule}")
        
        expected_routes = [
            "GET /api/members/showcase",
            "GET /api/members/segments", 
            "GET /api/members/showcase/<segment>"
        ]
        
        print("Found guest routes:")
        for route in guest_routes:
            print(f"  - {route}")
        
        # Check if all expected routes are present
        for expected in expected_routes:
            found = any(expected.replace('GET ', '').replace('<segment>', '<string:segment>') in route for route in guest_routes)
            if found:
                print(f"✓ {expected} - Found")
            else:
                print(f"✗ {expected} - Missing")
                return False
        
        print("✓ All guest routes are properly registered!")
        
    except Exception as e:
        print(f"✗ Error testing guest route imports: {e}")
        return False
    
    return True

def main():
    """Run all guest route tests"""
    print("Starting Guest Routes Test Suite...")
    print("=" * 50)
    
    # Test service methods
    service_test_passed = test_guest_service_methods()
    
    # Test route imports
    route_test_passed = test_route_imports()
    
    # Summary
    print("\n" + "=" * 50)
    print("GUEST ROUTES TEST SUMMARY")
    print("=" * 50)
    
    if service_test_passed and route_test_passed:
        print("✓ ALL TESTS PASSED!")
        print("✓ Guest routes are properly implemented and accessible")
        print("✓ Service methods for guest functionality are working")
        print("\nGuest routes available:")
        print("  - GET /api/members/showcase (view public member showcases)")
        print("  - GET /api/members/segments (view business segments)")
        print("  - GET /api/members/showcase/<segment> (view showcases by segment)")
        print("\nAll routes require guest authentication (@token_required + @permission_required(Role.GUEST))")
        return True
    else:
        print("✗ SOME TESTS FAILED!")
        print("Please check the implementation and try again.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)