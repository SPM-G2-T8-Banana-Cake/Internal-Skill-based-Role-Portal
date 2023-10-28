ROLE_LISTING_CREATE_JSON = {
    "Role_Name" : "This Is Test Name", 
    "Role_Desc" : "This Is Test Role Desc", 
    "Dept" : "This Is Test Dept", 
    "Application_Deadline" : "9999-12-31",
    "Skill_Name" : "Test Skill"
}
ROLE_LISTING_CREATE_EXPECTED_STATUS = 200

ROLE_LISTING_HR_VIEW_EXPECTED_ARR_LEN = 0

ROLE_LISTING_UPDATE_ROLE_ID = None
ROLE_LISTING_UPDATE_ROLE_LISTING_ID = None
ROLE_LISTING_UPDATE_JSON = {
    "Role_ID" : ROLE_LISTING_UPDATE_ROLE_ID, 
    "Role_Listing_ID" : ROLE_LISTING_UPDATE_ROLE_LISTING_ID, 
    "Role_Name" : "Updated Test Name", 
    "Skills" : "Updated Test Skill", 
    "Role_Desc" : "Updated Test Role Desc",
    "Application_Deadline" : "9999-12-31",
    "Dept" : "Updated Test Dept",
}
ROLE_LISTING_UPDATE_EXPECTED_STATUS = 200

APPLICATION_VIEW_APPLICANT_SKILLS_JSON = {
    "staffID" : "st1" 
}
APPLICATION_VIEW_APPLICANT_SKILLS_EXPECTED_STATUS = 200 

ROLE_LISTING_STAFF_VIEW_JSON = {"Staff_ID": "st99999"}
ROLE_LISTING_STAFF_VIEW_EXPECTED_ARR_LEN = 0

APPLICATION_STAFF_CREATE_JSON = {
    "Role_Listing_ID" : "rl1",
    "Applicant_ID" : "st1"
}
APPLICATION_STAFF_CREATE_EXPECTED_STATUS = 200


def test_default():
    assert "test" == "test"

# HR CRU of Role Listings --------------------------------------------------------
# def test_createRoleListing_validInputs_noSpecifiedListing(client):
#     response = client.post('/create_role_listing', json=ROLE_LISTING_CREATE_JSON)
#     response_status = response.status_code
#     ROLE_LISTING_UPDATE_ROLE_ID = response.get_json()[1]
#     ROLE_LISTING_UPDATE_ROLE_LISTING_ID = response.get_json()[2]
#     print('\nTest:', 'test_createRoleListing_validInputs_noSpecifiedListing')
#     print('Expected:', ROLE_LISTING_CREATE_EXPECTED_STATUS)
#     print('Actual:', response_status)
#     assert ROLE_LISTING_CREATE_EXPECTED_STATUS == response_status

# def test_hrViewRoleListing_hasRoleListing_Pass(client):
#     response = client.get('/hr_view_role_listings')
#     response_data_arr_len = len(response.get_json())
#     print('\nTest:', 'test_hrViewRoleListing_hasRoleListing_Pass')
#     print('Expected:', 'Arr Length >=', ROLE_LISTING_HR_VIEW_EXPECTED_ARR_LEN) 
#     print('Actual:', 'Arr Length =', response_data_arr_len)
#     assert response_data_arr_len > ROLE_LISTING_HR_VIEW_EXPECTED_ARR_LEN

# def test_updateRoleListing_hasRoleListing_Pass(client):
#     response = client.put('/update_role_listings', json=ROLE_LISTING_UPDATE_JSON)
#     response_status = response.status_code
#     print('\nTest:', 'test_updateRoleListing_hasRoleListing_Pass')
#     print('Expected:', ROLE_LISTING_UPDATE_EXPECTED_STATUS)
#     print('Actual:', response_status)
#     assert ROLE_LISTING_UPDATE_EXPECTED_STATUS == response_status

# HR view skills of role applicants --------------------------------------------------------
# def test_viewApplicantSkills_hasApplicant_Pass(client):
#     response = client.post(f'/view_applicant_skills', json=APPLICATION_VIEW_APPLICANT_SKILLS_JSON)
#     response_status = response.status_code
#     print('\nTest:', 'test_viewApplicantSkills_hasApplicant_Pass')
#     print('Expected:', APPLICATION_VIEW_APPLICANT_SKILLS_EXPECTED_STATUS)
#     print('Actual:', response.status_code)
#     assert APPLICATION_VIEW_APPLICANT_SKILLS_EXPECTED_STATUS == response_status

# Staff browse roles listing --------------------------------------------------------
# def test_staffViewRoleListing_hasListing_Pass(client):
#     response = client.post(f'/staff_view_role_listings', json=ROLE_LISTING_STAFF_VIEW_JSON)
#     response_data_arr_len = len(response.get_json())
#     print('\nTest:', 'test_staffViewRoleListing_hasListing_Pass')
#     print('Expected:', 'Arr Length >=', ROLE_LISTING_STAFF_VIEW_EXPECTED_ARR_LEN) 
#     print('Actual:', 'Arr Length =', response_data_arr_len)
#     assert response_data_arr_len > ROLE_LISTING_STAFF_VIEW_EXPECTED_ARR_LEN

# Staff apply for roles listing --------------------------------------------------------
# def test_staffCreateRoleListingApp_hasListing_Pass(client):
#     response = client.put(f'/create_role_application', json=APPLICATION_STAFF_CREATE_JSON)
#     response_status = response.status_code
#     print('\nTest:', 'test_staffCreateRoleListingApp_hasListing_Pass')
#     print('Expected:', APPLICATION_STAFF_CREATE_EXPECTED_STATUS)
#     print('Actual:', response.status_code)
#     assert APPLICATION_STAFF_CREATE_EXPECTED_STATUS == response_status
    





