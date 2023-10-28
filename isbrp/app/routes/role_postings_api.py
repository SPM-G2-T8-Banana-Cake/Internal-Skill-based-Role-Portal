from flask import Blueprint, request, jsonify
from utils.aws_services_wrapper import SqlServicesWrapper
from infrastructure.repos.role_postings_repo import RolePostingsRepository
from infrastructure.services.role_postings_service import RolePostingsService

role_postings_api = Blueprint("role_postings_api", __name__)
sql_services_wrapper = SqlServicesWrapper()
cursor = sql_services_wrapper.cursor
role_postings_repo = RolePostingsRepository(cursor=cursor) 
role_postings_service = RolePostingsService(role_postings_repo = role_postings_repo)

# @js_particulars_api.route('/test_jsp_endpoint', methods=['GET'])
# def test_endpoint():
#     return 'Default JS particulars endpoint returned.'

@role_postings_api.route('/cron_update_staff_hrms', methods=['GET'])
def cron_update_staff_hrms():
    result = role_postings_service.cron_update_staff_hrms()
    return jsonify({'message': result})

@role_postings_api.route('/cron_update_staff_skill_lms', methods=['GET'])
def cron_update_staff_skill_lms():
    result = role_postings_service.cron_update_staff_skill_lms()
    return jsonify({'message': result})

@role_postings_api.route('/cron_update_role_skill_ljps', methods=['GET'])
def cron_update_role_skill_ljps():
    result = role_postings_service.cron_update_role_skill_ljps()
    return jsonify({'message': result})

@role_postings_api.route('/create_role_listing', methods=['POST'])
def create_role_listing():
    role_postings_json = request.json
    print(request.json)
    res = role_postings_service.create_role_listing(role_postings_json)
    return res

@role_postings_api.route('/update_role_listings', methods = ['PUT'])
def update_role_listing():
    role_listings_json = request.json
    res = role_postings_service.update_role_listing(role_listings_json)
    return res

@role_postings_api.route('/hr_view_role_listings', methods=['GET'])
def hr_view_role_listings():
    return role_postings_service.hr_view_role_listings()

@role_postings_api.route('/staff_view_role_listings', methods=['POST'])
def staff_view_role_listings():
    staffID = request.json['Staff_ID']
    return role_postings_service.staff_view_role_listings(staffID)

@role_postings_api.route('/view_applicants_skills', methods=['GET'])
def view_applicants_skills():
    return role_postings_service.view_applicants_skills()

@role_postings_api.route('/delete_role_listing/<role_listing_id>', methods=['DELETE'])
def delete_role_listing(role_listing_id):
    return role_postings_service.delete_role_listing(role_listing_id)

@role_postings_api.route('/view_applicant_skills', methods = ['POST'])
def view_applicant_skills():
    request_data = request.get_json()
    staffID = request_data.get('staffID')
    res = role_postings_service.view_applicant_skills(staffID)
    return res

@role_postings_api.route('/create_role_application', methods=['PUT'])
def create_role_application():
    role_app_json = request.json
    res = role_postings_service.create_role_application(role_app_json)
    return res

@role_postings_api.route('/hr_log_in', methods=['POST'])
def hr_log_in():
    role_app_json = request.json
    user = role_app_json['username']
    password = role_app_json['password']
    res = role_postings_service.hr_log_in(user,password)
    return res

@role_postings_api.route('/staff_log_in', methods=['POST'])
def staff_log_in():
    role_app_json = request.json
    user = role_app_json['username']
    password = role_app_json['password']
    res = role_postings_service.staff_log_in(user,password)
    return res

@role_postings_api.route('/create_hr_user', methods=['POST'])
def create_hr_user():
    role_postings_json = request.json
    res = role_postings_service.create_hr_user(role_postings_json)
    return res

@role_postings_api.route('/create_staff_user', methods=['POST'])
def create_staff_user():
    role_postings_json = request.json
    res = role_postings_service.create_staff_user(role_postings_json)
    return res


#Run the 4 tests in sequential order else error
@role_postings_api.route('/test')
def ingest_staff_table_dummydata():
    return role_postings_service.ingest_staff_table("dummyStaffTable.json")

@role_postings_api.route('/test2')
def ingest_role_table_dummy_data():
    return role_postings_service.ingest_role_table("dummyRoleTable.json")

@role_postings_api.route('/test3')
def ingest_role_listing_table_dummy_data():
    return role_postings_service.ingest_role_listing_table("dummyRoleListingTable.json")

@role_postings_api.route('/test4')
def ingest_role_listing_application_table_dummy_data():
    return role_postings_service.ingest_role_listing_application_table("dummyRoleListingApplicationTable.json")

@role_postings_api.route('/test5')
def ingest_counter_table_dummy_data():
    return role_postings_service.ingest_counter_table("dummyCounter.json")

