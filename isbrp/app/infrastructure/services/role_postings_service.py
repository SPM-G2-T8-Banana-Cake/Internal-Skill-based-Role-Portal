import json
import time

from uuid import uuid4
from domain.models.role_postings import RolePostingDetails
from infrastructure.repos.role_postings_repo import RolePostingsRepository

class RolePostingsService(RolePostingsRepository):
    def __init__(self, role_postings_repo : RolePostingsRepository) -> None:
        self.repository = role_postings_repo
        
    def create_role_posting(self, role_postings_json: RolePostingDetails):
        start_time = time.time()
        try:
            Role_Name = role_postings_json.get('Role_Name')
            Application_Deadline = role_postings_json.get('Application_Deadline')

            # Insert Role_Name, Skill_Name, Application_Deadline and Role_Desc 
            # by joining Role_Skill and Role tables then passing in Application_Deadline
            create_role_sql = '''
                INSERT INTO spm.Role_Listing (Role_Name, Skill_Name, Role_Desc, Application_Deadline) 
                SELECT rs.Role_Name, rs.Skill_Name, r.Role_Desc, %s
                FROM spm.Role_Skill rs
                INNER JOIN spm.Role r ON rs.Role_Name = r.Role_Name
                WHERE rs.Role_Name = %s
            '''
            params = (Application_Deadline, Role_Name)
            self.repository.create(create_role_sql, params)

        except (TypeError, AttributeError) as e:
            print(f"Error creating instance: {e}")
            return f"Error creating instance: {e}"
        else:
            time_taken = time.time() - start_time
            response_message = f"create_role_posting: Time taken in seconds: {time_taken}"
            print(response_message)
            return response_message
        
    def view_role_listings(self):
        start_time = time.time()

        try:
            read_role_sql = '''SELECT * FROM spm.Role;
            '''
            res = self.repository.get(read_role_sql)
        except (AttributeError, TypeError, KeyError, ValueError) as e:
            print(f"An error occurred in view_role_listings: {e}")
            return {}
        
        else:
            print("view_role_listings Time taken in seconds: " + str(time.time()-start_time))
            return res

    def view_applicant_skills(self, StaffID):
        start_time = time.time()
        try:
            get_applicant_skills_sql = '''SELECT * FROM spm.Staff_Skill WHERE Staff_ID = %s;
            '''

            params = (StaffID)
            res = self.repository.get(get_applicant_skills_sql, params)
        except (AttributeError, TypeError, KeyError, ValueError) as e:
            print(f"An error occurred in get_applicant_skills_sql: {e}")
            return {}
        
        else:
            print("get_applicant_skills_sql Time taken in seconds: " + str(time.time()-start_time))
            return res