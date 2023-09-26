from flask import Blueprint

test_api = Blueprint("test", __name__)

@test_api.route('/test_endpoint', methods=['GET'])
def some_endpoint():
    return 'Default endpoint returned.'