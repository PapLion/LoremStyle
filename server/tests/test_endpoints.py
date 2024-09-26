import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app) 

# Tests for Auth

# @pytest.mark.asyncio
# async def test_join_request_registersys_when_name_exist():
#     """Test for creating a new user successfully"""
#     response = client.post(
#         url='/join_request',
#         json={
#             'name': 'Louis',
#             'email': 'john_doe@exampleV.com',
#             'password': 'hashed1'
#         }
#     )
#     assert response.status_code == 201
#     assert response.json()["detail"] == "token"

@pytest.mark.asyncio
async def test_join_request_registersys_when_email_already_existe():
    """Test for login user successfully"""
    response = client.post(
        url='/join_request',
        json={
            'name': 'Kawasaki',
            'email': 'john_doe@example.com',
            'password': 'hashed1'
        }
    )
    assert response.status_code == 409
    assert response.json()['detail'] == 'Account already exist'

@pytest.mark.asyncio
async def test_join_request_loginsys_when_name_does_not_exist():
    """Test for login user successfully"""
    response = client.post(
        url='/join_request',
        json={
            'name': None,
            'email': 'john_doe@exampleV.com',
            'password': 'hashed1'
        }
    )
    assert response.status_code == 200


@pytest.mark.asyncio
async def test_join_request_loginsys_when_email_is_wrong():
    """Test for login user successfully"""
    response = client.post(
        url='/join_request',
        json={
            'name': None,
            'email': 'wrong_email@example.com',
            'password': 'hashed1'
        }
    )
    assert response.status_code == 404
    assert response.json()["detail"] == "Account not exist"

@pytest.mark.asyncio
async def test_join_request_loginsys_when_password_is_wrong():
    """Test for login user successfully"""
    response = client.post(
        url='/join_request',
        json={
            'name': None,
            'email': 'john@example.com',
            'password': 'wrongpasswordhashed'
        }
    )
    assert response.status_code == 409
    assert response.json()["detail"] == "Wrong password"






