import pytest
from backend.app.main import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_login(client):
    rv = client.post('/api/auth/login', json={
        'email': 'test@test.com',
        'password': 'password'
    })
    assert rv.status_code == 200
    assert rv.json == {'message': 'Login successful'}
