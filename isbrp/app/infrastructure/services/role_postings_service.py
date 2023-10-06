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

    def update_role_posting(self, role_postings_json: RolePostingDetails):
        start_time = time.time()
        try:
            Role_Name = role_postings_json.get('Role_Name')
            Skill_Name = role_postings_json.get('Skill_Name')
            Role_Desc = role_postings_json.get('Role_Desc')
            Application_Deadline = role_postings_json.get('Application_Deadline')

            # Update spm.Role_Listing by passing in updated
            # Skill_Name, Role_Desc and Application_Deadline where Role_Name = Specified Role_Name
            update_role_posting_sql = '''
                UPDATE spm.Role_Listing
                SET Skill_Name = %s, Role_Desc = %s, Application_Deadline = %s
                WHERE Role_Name = %s;
            '''
            params = (Skill_Name, Role_Desc, Application_Deadline, Role_Name)
            self.repository.update(update_role_posting_sql, params)

        except (TypeError, AttributeError) as e:
            print(f"Error updating instance: {e}")
            return f"Error updating instance: {e}"
        else:
            time_taken = time.time() - start_time
            response_message = f"create_role_posting: Time taken in seconds: {time_taken}"
            print(response_message)
            return response_message
