import pytest
from backend.app.main import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_get_members(client):
    rv = client.get('/api/members/')
    assert rv.status_code == 200
    assert rv.json == [{'id': 1, 'name': 'John Doe'}]
