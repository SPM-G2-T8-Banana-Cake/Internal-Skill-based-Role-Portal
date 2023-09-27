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

#Run the 4 tests in sequential order else error

@role_postings_api.route('/test')
def ingest_role_dummy_data():
    return role_postings_service.ingest_role("dummyRoleData.json")

@role_postings_api.route('/test2')
def ingest_role_skill_dummy_data():
    return role_postings_service.ingest_role_skill("dummyRoleSkillData.json")

@role_postings_api.route('/test3')
def ingest_staff_dummy_data():
    return role_postings_service.ingest_staff_data("dummyStaffData.json")

@role_postings_api.route('/test4')
def ingest_staff_skill_dummy_data():
    return role_postings_service.ingest_staff_skill_data("dummyStaffSkills.json")