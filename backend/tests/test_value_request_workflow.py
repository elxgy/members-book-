#!/usr/bin/env python3
"""
Integration test for complete value request workflow
"""

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import json
from flask import Flask
from backend.app.main import app
from backend.app.utils.database import members_collection, value_requests_collection
from bson import ObjectId
from datetime import datetime
import logging

# Configure logging for test visibility
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class TestValueRequestWorkflow:
    """Integration test for complete value request workflow"""
    
    def setup_method(self):
        """Setup test environment for each test method"""
        self.app = app
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        
        # Test data with unique emails
        import time
        timestamp = str(int(time.time()))
        
        self.test_member_data = {
            'name': 'Test Member',
            'email': f'test.member.{timestamp}@example.com',
            'password': 'TestPassword123!',
            'company': 'Test Company',
            'position': 'CEO',
            'deal_count': 5,
            'deal_value': 1000000,
            'is_verified': False,
            'is_admin': False
        }
        
        self.test_admin_data = {
            'name': 'Test Admin',
            'email': f'test.admin.{timestamp}@example.com',
            'password': 'AdminPassword123!',
            'company': 'Admin Company',
            'position': 'Administrator',
            'deal_count': 10,
            'deal_value': 5000000,
            'is_verified': True,
            'is_admin': True
        }
        
        self.member_id = None
        self.admin_id = None
        self.member_token = None
        self.admin_token = None
        self.request_id = None
    
    def teardown_method(self):
        """Cleanup after each test method"""
        self._cleanup_test_data()
        if hasattr(self, 'app_context'):
            self.app_context.pop()
    
    def _cleanup_test_data(self):
        """Clean up test data from database"""
        try:
            if self.member_id:
                members_collection.delete_one({'_id': ObjectId(self.member_id)})
            if self.admin_id:
                members_collection.delete_one({'_id': ObjectId(self.admin_id)})
            if self.request_id:
                value_requests_collection.delete_one({'_id': ObjectId(self.request_id)})
            logger.info("Test data cleanup completed")
        except Exception as e:
            logger.error(f"Cleanup error: {e}")
    
    def _create_test_users(self):
        """Create test member and admin users"""
        # Create test member
        member_response = self.client.post('/api/auth/register', 
                                         json=self.test_member_data,
                                         headers={'Content-Type': 'application/json'})
        logger.info(f"Member registration response: {member_response.status_code} - {member_response.data}")
        assert member_response.status_code == 201, f"Expected 201, got {member_response.status_code}: {member_response.data}"
        member_data = json.loads(member_response.data)
        self.member_id = member_data['user_id']
        
        # Create test admin
        admin_response = self.client.post('/api/auth/register',
                                        json=self.test_admin_data,
                                        headers={'Content-Type': 'application/json'})
        assert admin_response.status_code == 201
        admin_data = json.loads(admin_response.data)
        self.admin_id = admin_data['user_id']
        
        logger.info(f"Created test users - Member: {self.member_id}, Admin: {self.admin_id}")
    
    def _authenticate_users(self):
        """Authenticate both test users and get tokens"""
        # Login member
        member_login = self.client.post('/api/auth/login',
                                      json={'email': self.test_member_data['email'],
                                           'password': self.test_member_data['password']},
                                      headers={'Content-Type': 'application/json'})
        logger.info(f"Member login response: {member_login.status_code} - {member_login.data}")
        assert member_login.status_code == 200
        member_login_data = json.loads(member_login.data)
        self.member_token = member_login_data['token']
        logger.info(f"Member token: {self.member_token[:20]}...")
        
        # Login admin
        admin_login = self.client.post('/api/auth/login',
                                     json={'email': self.test_admin_data['email'],
                                          'password': self.test_admin_data['password']},
                                     headers={'Content-Type': 'application/json'})
        logger.info(f"Admin login response: {admin_login.status_code} - {admin_login.data}")
        assert admin_login.status_code == 200
        admin_login_data = json.loads(admin_login.data)
        self.admin_token = admin_login_data['token']
        logger.info(f"Admin token: {self.admin_token[:20]}...")
        
        logger.info("User authentication completed")
    
    def test_complete_value_request_workflow(self):
        """Test the complete value request workflow from creation to approval"""
        logger.info("Starting complete value request workflow test")
        
        # Step 1: Setup Phase
        self._create_test_users()
        self._authenticate_users()
        
        # Step 2: Member Creates Request
        request_data = {
            'request_type': 'both',
            'current_deal_count': self.test_member_data['deal_count'],
            'requested_deal_count': 8,
            'current_deal_value': self.test_member_data['deal_value'],
            'requested_deal_value': 1500000,
            'justification': 'Completed 3 additional deals worth $500k total'
        }
        
        create_response = self.client.post('/api/value-requests/',
                                         json=request_data,
                                         headers={
                                             'Content-Type': 'application/json',
                                             'x-access-token': self.member_token
                                         })
        
        logger.info(f"Value request creation response: {create_response.status_code} - {create_response.data}")
        assert create_response.status_code == 201, f"Expected 201, got {create_response.status_code}: {create_response.data}"
        create_data = json.loads(create_response.data)
        self.request_id = create_data['request_id']
        logger.info(f"Value request created with ID: {self.request_id}")
        
        # Step 3: Check Initial Request Status (Member View)
        member_requests_response = self.client.get('/api/value-requests/my-requests',
                                                 headers={'x-access-token': self.member_token})
        
        assert member_requests_response.status_code == 200
        member_requests_data = json.loads(member_requests_response.data)
        assert len(member_requests_data['requests']) == 1
        assert member_requests_data['requests'][0]['verified'] == False
        logger.info("Member can see their unverified request")
        
        # Step 3b: Check Initial Request Status (Admin View)
        admin_requests_response = self.client.get('/api/value-requests/',
                                                headers={'x-access-token': self.admin_token})
        
        logger.info(f"Admin pending requests response: {admin_requests_response.status_code} - {admin_requests_response.data}")
        assert admin_requests_response.status_code == 200
        admin_requests_data = json.loads(admin_requests_response.data)
        assert len(admin_requests_data['requests']) >= 1
        request_found = any(req['_id'] == self.request_id for req in admin_requests_data['requests'])
        assert request_found
        logger.info("Admin can see the pending request")
        
        # Step 4: Admin Approves Request
        approval_data = {
            'verified': True,
            'admin_notes': 'Verified deal completion documentation. Approved for value increase.'
        }
        
        approve_response = self.client.put(f'/api/value-requests/{self.request_id}/verify',
                                         json=approval_data,
                                         headers={
                                             'Content-Type': 'application/json',
                                             'x-access-token': self.admin_token
                                         })
        
        logger.info(f"Admin approval response: {approve_response.status_code} - {approve_response.data}")
        assert approve_response.status_code == 200
        approve_data = json.loads(approve_response.data)
        assert 'message' in approve_data
        assert 'approved successfully' in approve_data['message']
        logger.info("Admin successfully approved the request")
        
        # Step 5: Check Updated Request Status (Member View)
        updated_member_requests = self.client.get('/api/value-requests/my-requests',
                                                headers={'x-access-token': self.member_token})
        
        assert updated_member_requests.status_code == 200
        updated_member_data = json.loads(updated_member_requests.data)
        verified_request = updated_member_data['requests'][0]
        assert verified_request['verified'] == True
        assert verified_request['admin_notes'] == approval_data['admin_notes']
        assert verified_request['verified_at'] is not None
        logger.info("Member can see their approved request with admin notes")
        
        # Step 5b: Check Updated Request Status (Admin View)
        updated_admin_requests = self.client.get('/api/value-requests/',
                                               headers={'x-access-token': self.admin_token})
        
        assert updated_admin_requests.status_code == 200
        updated_admin_data = json.loads(updated_admin_requests.data)
        admin_verified_request = next(req for req in updated_admin_data['requests'] if req['_id'] == self.request_id)
        assert admin_verified_request['verified'] == True
        logger.info("Admin can see the request as verified")
        
        # Step 6: Verify User Profile Update
        profile_response = self.client.get(f'/api/members/{self.member_id}',
                                         headers={'x-access-token': self.member_token})
        
        logger.info(f"Profile response: {profile_response.status_code} - {profile_response.data}")
        assert profile_response.status_code == 200
        profile_data = json.loads(profile_response.data)
        # Check if response has 'member' key or if the data is directly the member object
        member_profile = profile_data.get('member', profile_data)
        
        # Verify the deal values have been updated to requested values
        assert member_profile['number_of_deals'] == request_data['requested_deal_count']
        assert member_profile['total_deal_value'] == request_data['requested_deal_value']
        logger.info(f"User profile updated - Deal count: {member_profile['number_of_deals']}, Deal value: {member_profile['total_deal_value']}")
        
        logger.info("Complete value request workflow test passed successfully")
    
    def test_error_cases(self):
        """Test various error scenarios in the value request workflow"""
        logger.info("Starting error cases test")
        
        self._create_test_users()
        self._authenticate_users()
        
        # Test 1: Duplicate request (should fail)
        request_data = {
            'request_type': 'both',
            'current_deal_count': 5,
            'requested_deal_count': 8,
            'current_deal_value': 1000000,
            'requested_deal_value': 1500000,
            'justification': 'Test duplicate request'
        }
        
        # Create first request
        first_response = self.client.post('/api/value-requests/',
                                        json=request_data,
                                        headers={
                                            'Content-Type': 'application/json',
                                            'x-access-token': self.member_token
                                        })
        assert first_response.status_code == 201
        first_data = json.loads(first_response.data)
        self.request_id = first_data['request_id']
        
        # Try to create duplicate request (should fail)
        duplicate_response = self.client.post('/api/value-requests/',
                                            json=request_data,
                                            headers={
                                                'Content-Type': 'application/json',
                                                'x-access-token': self.member_token
                                            })
        logger.info(f"Duplicate request response: {duplicate_response.status_code} - {duplicate_response.data}")
        assert duplicate_response.status_code == 400
        logger.info("Duplicate request properly rejected")
        
        # Test 2: Invalid request values
        invalid_request = {
            'request_type': 'both',
            'current_deal_count': 5,
            'requested_deal_count': -1,  # Invalid negative value
            'current_deal_value': 1000000,
            'requested_deal_value': 1500000,
            'justification': 'Test invalid values'
        }
        
        invalid_response = self.client.post('/api/value-requests/',
                                          json=invalid_request,
                                          headers={
                                              'Content-Type': 'application/json',
                                              'x-access-token': self.member_token
                                          })
        assert invalid_response.status_code == 400
        logger.info("Invalid request values properly rejected")
        
        # Test 3: Unauthorized access (no token)
        unauthorized_response = self.client.get('/api/value-requests/')
        assert unauthorized_response.status_code == 401
        logger.info("Unauthorized access properly rejected")
        
        # Test 4: Member trying to verify request (should fail)
        member_verify_response = self.client.put(f'/api/value-requests/{self.request_id}/verify',
                                               json={'admin_notes': 'Member trying to verify'},
                                               headers={
                                                   'Content-Type': 'application/json',
                                                   'x-access-token': self.member_token
                                               })
        assert member_verify_response.status_code == 403
        logger.info("Member verification attempt properly rejected")
        
        logger.info("Error cases test completed successfully")
    
    def test_request_validation(self):
        """Test request data validation"""
        logger.info("Starting request validation test")
        
        self._create_test_users()
        self._authenticate_users()
        
        # Test missing required fields
        incomplete_request = {
            'request_type': 'both',
            'current_deal_count': 5
            # Missing other required fields
        }
        
        incomplete_response = self.client.post('/api/value-requests/',
                                             json=incomplete_request,
                                             headers={
                                                 'Content-Type': 'application/json',
                                                 'x-access-token': self.member_token
                                             })
        assert incomplete_response.status_code == 400
        logger.info("Incomplete request data properly rejected")
        
        # Test invalid request type
        invalid_type_request = {
            'request_type': 'invalid_type',
            'current_deal_count': 5,
            'requested_deal_count': 8,
            'current_deal_value': 1000000,
            'requested_deal_value': 1500000,
            'justification': 'Test invalid type'
        }
        
        invalid_type_response = self.client.post('/api/value-requests/',
                                               json=invalid_type_request,
                                               headers={
                                                   'Content-Type': 'application/json',
                                                   'x-access-token': self.member_token
                                               })
        assert invalid_type_response.status_code == 400
        logger.info("Invalid request type properly rejected")
        
        logger.info("Request validation test completed successfully")

def run_workflow_tests():
    """Run all value request workflow tests"""
    test_instance = TestValueRequestWorkflow()
    
    try:
        logger.info("Starting value request workflow tests...")
        
        # Run main workflow test
        test_instance.test_complete_value_request_workflow()
        test_instance._cleanup_test_data()
        
        # Run error cases test
        test_instance.test_error_cases()
        test_instance._cleanup_test_data()
        
        # Run validation test
        test_instance.test_request_validation()
        test_instance._cleanup_test_data()
        
        logger.info("🎉 All value request workflow tests passed successfully!")
        return True
        
    except AssertionError as e:
        logger.error(f"❌ Assertion failed: {e}")
        import traceback
        logger.error(f"Traceback: {traceback.format_exc()}")
        test_instance._cleanup_test_data()
        return False
    except Exception as e:
        logger.error(f"❌ Test failed: {e}")
        import traceback
        logger.error(f"Traceback: {traceback.format_exc()}")
        test_instance._cleanup_test_data()
        return False
    finally:
        test_instance.app_context.pop()

if __name__ == '__main__':
    success = run_workflow_tests()
    sys.exit(0 if success else 1)