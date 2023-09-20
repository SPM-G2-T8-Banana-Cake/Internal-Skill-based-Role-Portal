import json
import time
import boto3 
import time

from uuid import uuid4
from domain.models.js_particulars import JsParticulars
from infrastructure.services.interfaces.service_interfaces import IJsParticularsService
from infrastructure.repos.interfaces.repo_interfaces import IJsParticularsRepository
from boto3.dynamodb.conditions import Key, Attr

class JsParticiularsService(IJsParticularsService):
    def __init__(self, js_particulars_repo : IJsParticularsRepository) -> None:
        self.repository = js_particulars_repo
        
    def register_jobseeker(self, js_particulars: JsParticulars):
        uuid = str(uuid4())
        start_time = time.time()
        try:
            pass
        except (TypeError, AttributeError) as e:
            print(f"Error creating instance: {e}")
        else:
            print("register_jobseeker: Time taken in seconds: " + str(time.time()-start_time))


    # WILL BE REMOVED ONCE CREATION WORKS PRODUCTION-WISE
    def register_jobseeker_from_file(self, file_name: str):
        with open (file_name, 'r') as json_file:
            data = json.load(json_file)
            for d in data:
                uuid = str(uuid4())
                try:
                    pass
                except (TypeError, AttributeError) as e:
                    print(f"Error creating instance: {e}")
                else:
                    pass
        

    def get_all_jobseeker_particulars(self) -> JsParticulars:
        start_time = time.time()
        try:
           pass
        except (AttributeError, TypeError, KeyError, ValueError) as e:
            print(f"An error occurred: {e}")
            return {}
        else:
            print("get_list_of_jobseeker_particulars Time taken in seconds: " + str(time.time()-start_time))
        

    def get_jobseeker_by_id(self, js_uid):
        start_time = time.time()
        try:
            pass
        except (AttributeError, TypeError, KeyError, ValueError) as e:
            print(f"An error occurred: {e}")
            return {}
        else:
            print("get_jobseeker_by_id Time taken in seconds: " + str(time.time()-start_time))
    
    
    def search_jobseeker_by_params(self, search_params: str) -> JsParticulars:
        start_time = time.time()
        try:
            pass
        except (AttributeError, TypeError, KeyError, ValueError) as e:
            print(f"An error occurred: {e}")
            return {}
        else:
            print("search_jobseeker_by_params Time taken in seconds: " + str(time.time()-start_time))


    def update_jobseeker(self, js: JsParticulars):
        start_time = time.time()
        try:
            pass
        except (TypeError, AttributeError, KeyError, ValueError) as e:
            return(f"Error updating profile: {e}")
        
        else:
            print("update_jobseeker Time taken in seconds: " + str(time.time()-start_time))


    def delete_jobseeker_by_id(self, js_uid: str) -> JsParticulars:
        start_time = time.time()
        try:
            pass
        except (AttributeError, TypeError, KeyError, ValueError) as e:
            print(f"An error occurred: {e}")
            return {}
        
        else:
            print("delete_jobseeker Time taken in seconds: " + str(time.time()-start_time))