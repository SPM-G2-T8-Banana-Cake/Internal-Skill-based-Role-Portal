from flask import Blueprint, jsonify, request
from utils.aws_services_wrapper import SqlServicesWrapper
from infrastructure.repos.role_postings_repo import RolePostingsRepository
from infrastructure.services.role_postings_service import RolePostingsService
import pymssql

role_postings_api = Blueprint("role_postings_api", __name__)
sql_services_wrapper = SqlServicesWrapper()
cursor = sql_services_wrapper.cursor
role_postings_repo = RolePostingsRepository(cursor=cursor) 
role_postings_service = RolePostingsService(role_postings_repo = role_postings_repo)

# @js_particulars_api.route('/test_jsp_endpoint', methods=['GET'])
# def test_endpoint():
#     return 'Default JS particulars endpoint returned.'

@role_postings_api.route('/create_role_posting', methods=['POST'])
def create_role_posting():
    role_postings_json = request.json
    res = role_postings_service.create_role_posting(role_postings_json)
    return res

    # host = 'is212g2t8db.cozufzqpaqz5.ap-southeast-1.rds.amazonaws.com'
    # username = 'admin'
    # password = 'PinguDevelopers123!'
    # db = 'is212g2t8db'
    # conn = pymssql.connect(host, username, password, db)

    # cursor = conn.cursor()
    # cursor.execute("INSERT INTO spm.Staff VALUES (1, 'John', 'Doe', 'Resources', 'United States', 'john.doe@example.com', 3)")
    # conn.commit()
    # cursor.execute("SELECT * FROM spm.Staff")
    # records = cursor.fetchall()
    # conn.close()
    # return jsonify(records)
    # result = js_particulars_service.get_all_jobseeker_particulars()
    # return jsonify(result)

