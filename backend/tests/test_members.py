import pytest
from backend.app.main import app
from unittest.mock import patch, MagicMock
from bson import ObjectId

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@patch('backend.app.routes.members.token_required', lambda f: f)
@patch('backend.app.routes.members.permission_required', lambda role: lambda f: f)
@patch('backend.app.services.member_service.members_collection')
def test_get_members(mock_collection, client):
    mock_collection.find.return_value = [
        {'_id': ObjectId(), 'name': 'John Doe', 'description': ''},
        {'_id': ObjectId(), 'name': 'Jane Doe', 'description': ''}
    ]
    rv = client.get('/api/members/')
    assert rv.status_code == 200
    assert len(rv.json) == 2
    assert rv.json[0]['name'] == 'John Doe'

@patch('backend.app.routes.members.token_required', lambda f: f)
@patch('backend.app.routes.members.permission_required', lambda role: lambda f: f)
@patch('backend.app.services.member_form_service.members_collection')
@patch('backend.app.services.member_form_service.members_info_collection')
@patch('backend.app.services.member_form_service.ai_service')
def test_submit_form(mock_ai_service, mock_info_collection, mock_members_collection, client):
    # Mock the AI service
    mock_ai_service.generate_bio.return_value = "This is a test description."

    # Mock the database collections
    mock_info_collection.find_one.return_value = None
    mock_members_collection.update_one.return_value = MagicMock()
    mock_info_collection.insert_one.return_value = MagicMock()

    form_data = {
        "name": "Test User",
        "email": "test@example.com",
        "company": "Test Inc.",
        "sector": "Technology",
        "hierarchy": "Engineer",
        "phone": "1234567890",
        "linkedin": "linkedin.com/testuser",
        "instagram": "instagram.com/testuser",
        "website": "testuser.com",
        "title": "Software Engineer",
        "expertise": ["Python", "Flask"],
        "connections": 100,
        "negocios_fechados": 10,
        "valor_total": 50000.0,
        "indicacoes_recebidas": 5,
        "valor_total_por_indicacao": 10000.0,
        "indicacoes_fornecidas": 8,
        "valor_total_acumulado": 80000.0
    }

    member_id = str(ObjectId())
    rv = client.post(f'/api/members/forms/some-form-id/submit', json={
        "member_id": member_id,
        **form_data
    })

    assert rv.status_code == 200
    assert rv.json['message'] == "Bio generated and updated successfully"
    assert rv.json['description'] == "This is a test description."

    # Assert that the database methods were called
    mock_info_collection.find_one.assert_called_with({"user_id": member_id})
    mock_info_collection.insert_one.assert_called_once()
    mock_members_collection.update_one.assert_called_once()