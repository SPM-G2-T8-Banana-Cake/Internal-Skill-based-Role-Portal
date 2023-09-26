import json
import time

from uuid import uuid4
from domain.models.role_postings import RolePostingDetails, RoleDetails
from infrastructure.repos.role_postings_repo import RolePostingsRepository
from utils.aws_services_wrapper import SqlServicesWrapper

class RolePostingsService(RolePostingsRepository):
    def __init__(self, role_postings_repo : RolePostingsRepository) -> None:
        self.repository = role_postings_repo

    def ingest_role(self, file_name):
        with open (file_name, 'r') as json_file:
            data = json.load(json_file)
            for d in data: 
                try:
                    RoleDetails(**d)
                except (TypeError, AttributeError) as e:
                    print(f"Error creating role posting: {e}")
                else:
                    Role_Name = d['Role_Name']
                    Role_Desc = d['Role_Desc']
                    create_role_sql = "INSERT INTO spm.Role (Role_Name, Role_Desc) VALUES (%s, %s)"
                    val = (Role_Name, Role_Desc)
                    self.repository.create(create_role_sql, val)
        return "Success"
    
    def ingest_role_skill(self, file_name):
        with open (file_name, 'r') as json_file:
            data = json.load(json_file)
            for d in data: 
                try:
                    RolePostingDetails(**d)
                except (TypeError, AttributeError) as e:
                    print(f"Error creating role posting: {e}")
                else:
                    Role_Name = d['Role_Name']
                    Skill_Name = d['Skill_Name']
                    create_role_skill_sql = "INSERT INTO spm.Role_Skill (Role_Name, Skill_Name) VALUES (%s, %s)"
                    val = (Role_Name, Skill_Name)
                    self.repository.create(create_role_skill_sql, val)
        return "Success"



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
