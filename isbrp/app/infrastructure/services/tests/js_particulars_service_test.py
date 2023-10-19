ROLE_LISTING_CREATE_JSON = {
    "Role_Name" : "This Is Test Name", 
    "Role_Desc" : "This Is Test Role Desc", 
    "Dept" : "This Is Test Dept", 
    "Application_Deadline" : "9999-12-31",
    "Skill_Name" : "Test Skill"
}
ROLE_LISTING_CREATE_EXPECTED_STATUS = 200

ROLE_LISTING_VIEW_EXPECTED_ARR_LEN = 0

def test_default():
    assert "test" == "test"

def test_createRoleListing_validInputs_noSpecifiedListing(client):
    response = client.post('/create_role_listing', json=ROLE_LISTING_CREATE_JSON)
    response_status = response.status_code
    print('\nTest:', 'test_createRoleListing_validInputs_noSpecifiedListing')
    print('Expected:', ROLE_LISTING_CREATE_EXPECTED_STATUS)
    print('Actual:', response_status)
    assert ROLE_LISTING_CREATE_EXPECTED_STATUS == response_status

def test_viewRoleListing_hasRoleListing_Pass(client):
    response = client.get('/view_role_listings')
    response_data_arr_len = len(response.get_json())
    print('\nTest:', 'test_viewRoleListing_hasRoleListing_Pass')
    print('Expected:', 'Arr Length >=', ROLE_LISTING_VIEW_EXPECTED_ARR_LEN) 
    print('Actual:', 'Arr Length =', response_data_arr_len)
    assert response_data_arr_len > ROLE_LISTING_VIEW_EXPECTED_ARR_LEN