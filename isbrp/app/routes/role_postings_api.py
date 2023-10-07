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

@role_postings_api.route('/view_role_listings', methods=['GET'])
def view_role_listings():
    return role_postings_service.view_role_listings()

@role_postings_api.route('/view_applicant_skills', methods=['GET'])
def view_applicant_skills():
    return role_postings_service.view_applicant_skills()


@role_postings_api.route('/delete_role_listing/<role_listing_id>', methods=['DELETE'])
def delete_role_listing(role_listing_id):
    return role_postings_service.delete_role_listing(role_listing_id)

#Run the 4 tests in sequential order else error

@role_postings_api.route('/test')
def ingest_staff_table_dummydata():
    return role_postings_service.ingest_staff_table("dummyStaffTable.json")

@role_postings_api.route('/test2')
def ingest_staff_skills_table_dummy_data():
    return role_postings_service.ingest_staff_skills_table("dummyStaffSkillsTable.json")

@role_postings_api.route('/test3')
def ingest_role_table_dummy_data():
    return role_postings_service.ingest_role_table("dummyRoleTable.json")

@role_postings_api.route('/test4')
def ingest_role_skill_table_dummy_data():
    return role_postings_service.ingest_role_skill_table("dummyRoleSkillTable.json")

@role_postings_api.route('/test5')
def ingest_role_listing_table_dummy_data():
    return role_postings_service.ingest_role_listing_table("dummyRoleListingTable.json")

@role_postings_api.route('/test6')
def ingest_role_listing_application_table_dummy_data():
    return role_postings_service.ingest_role_listing_application_table("dummyRoleListingApplicationTable.json")

@role_postings_api.route('/test7')
def ingest_counter_table_dummy_data():
    return role_postings_service.ingest_counter_table("dummyCounter.json")