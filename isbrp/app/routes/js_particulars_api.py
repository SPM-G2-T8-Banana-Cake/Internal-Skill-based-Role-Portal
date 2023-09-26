from flask import Blueprint
from utils.aws_services_wrapper import app_aws_wrapper
from infrastructure.repos.js_particulars_repo import JsParticularsRepository
from infrastructure.services.js_particulars_service import JsParticiularsService

js_particulars_api = Blueprint("js_particulars_api", __name__)
js_particulars_repo = JsParticularsRepository(client=app_aws_wrapper.client)
js_particulars_service = JsParticiularsService(js_particulars_repo=js_particulars_repo)

@js_particulars_api.route('/test_jsp_endpoint', methods=['GET'])
def test_endpoint():
    return 'Default JS particulars endpoint returned.'

