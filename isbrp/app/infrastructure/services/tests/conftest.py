import pytest
from flask import Flask, request, jsonify
from ...server import app

@pytest.fixture()
def client():
    with app.test_client() as client:
        yield client