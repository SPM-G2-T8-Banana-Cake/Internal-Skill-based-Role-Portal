import pytest
from server import app

@pytest.fixture()
def test():
    return "print test"