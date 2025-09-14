import pytest
import json
import jwt
from app.main import app # Import the app to ensure context is available

def test_guest_login_success(client, mock_db, sample_guest_user):
    """Test successful guest login"""
    # Arrange: Configure the mock database to return the sample guest user
    mock_db.members.find_one.return_value = sample_guest_user
    
    # Act: Make a request to the guest-login endpoint
    response = client.post('/api/auth/guest-login')
    
    # Assert: Check for a successful response and valid token
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'token' in data
    assert data['user_type'] == 'guest'
    
    # Verify the database was queried correctly
    mock_db.members.find_one.assert_called_with({"email": "guest@test.com", "user_type": "guest"})
    
    # Assert: Decode the token and verify its contents
    # The secret key is 'test-jwt-secret' from conftest.py
    decoded_token = jwt.decode(data['token'], 'test-jwt-secret', algorithms=['HS256'])
    assert decoded_token['role'] == 'guest'
    assert decoded_token['public_id'] == str(sample_guest_user['_id'])

def test_guest_login_no_guest_user_in_db(client, mock_db):
    """Test guest login failure when the guest user is not found in the database"""
    # Arrange: Configure the mock database to return nothing
    mock_db.members.find_one.return_value = None
    
    # Act: Make a request to the guest-login endpoint
    response = client.post('/api/auth/guest-login')
    
    # Assert: Check for a 404 Not Found error response
    assert response.status_code == 404
    data = json.loads(response.data)
    assert 'error' in data
    assert data['error'] == 'Guest user not found'
