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
            Skill_Name = role_postings_json.get('Skill_Name')
            create_role_sql = "INSERT INTO spm.Role_Skill (Role_Name, Skill_Name) VALUES (%s, %s)"
            params = (Role_Name, Skill_Name)
            self.repository.create(create_role_sql, params)
        except (TypeError, AttributeError) as e:
            print(f"Error creating instance: {e}")
            return f"Error creating instance: {e}"
        else:
            time_taken = time.time() - start_time
            response_message = f"create_role_posting: Time taken in seconds: {time_taken}"
            print(response_message)
            return response_message