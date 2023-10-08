import json
import time

from uuid import uuid4
from domain.models.role_postings import StaffTable, StaffSkillTable, RoleTable, RoleListingTable, RoleSkillTable, RoleApplicationTable, CounterTable
from infrastructure.repos.role_postings_repo import RolePostingsRepository
from utils.aws_services_wrapper import SqlServicesWrapper

class RolePostingsService(RolePostingsRepository):
    def __init__(self, role_postings_repo : RolePostingsRepository) -> None:
        self.repository = role_postings_repo

    def ingest_staff_table(self, file_name):
        with open (file_name, 'r') as json_file:
            data = json.load(json_file)
            for d in data: 
                try:
                    StaffTable(**d)
                except (TypeError, AttributeError) as e:
                    print(f"Error creating staff: {e}")
                else:
                    Staff_ID = d['Staff_ID']
                    Staff_FName = d['Staff_FName']
                    Staff_LName = d['Staff_LName']
                    Dept = d['Dept']
                    Country = d['Country']
                    Email = d['Email']
                    Access_Rights = d['Access_Rights']
                    create_staff_table_sql = "INSERT INTO spm.Staff_Table (Staff_ID, Staff_FName, Staff_LName, Dept, Country, Email, Access_Rights) VALUES (%s, %s, %s, %s, %s, %s, %s)"
                    val = (Staff_ID, Staff_FName, Staff_LName, Dept, Country, Email, Access_Rights)
                    self.repository.create(create_staff_table_sql, val)
        return "Success" 
    
    
    def ingest_staff_skills_table(self, file_name):
        with open (file_name, 'r') as json_file:
            data = json.load(json_file)
            for d in data: 
                try:
                    StaffSkillTable(**d)
                except (TypeError, AttributeError) as e:
                    print(f"Error creating staff skills: {e}")
                else:
                    Staff_Skill_ID = d['Staff_Skill_ID']
                    Staff_ID = d['Staff_ID']
                    Skill_Name = d['Skill_Name']
                    create_staff_skills_table_sql = "INSERT INTO spm.Staff_Skills_Table (Staff_Skill_ID, Staff_ID, Skill_Name) VALUES (%s, %s, %s)"
                    val = (Staff_Skill_ID, Staff_ID, Skill_Name)
                    self.repository.create(create_staff_skills_table_sql, val)
        return "Success"

    def ingest_role_table(self, file_name):
        with open (file_name, 'r') as json_file:
            data = json.load(json_file)
            for d in data: 
                try:
                    RoleTable(**d)
                except (TypeError, AttributeError) as e:
                    print(f"Error creating role: {e}")
                else:
                    Role_ID = d['Role_ID']
                    Role_Name = d['Role_Name']
                    Role_Desc = d['Role_Desc']
                    create_role_table_sql = "INSERT INTO spm.Role_Table (Role_ID, Role_Name, Role_Desc) VALUES (%s, %s, %s)"
                    val = (Role_ID, Role_Name, Role_Desc)
                    self.repository.create(create_role_table_sql, val)
        return "Success"
    
    def ingest_role_skill_table(self, file_name):
            with open (file_name, 'r') as json_file:
                data = json.load(json_file)
                for d in data: 
                    try:
                        RoleSkillTable(**d)
                    except (TypeError, AttributeError) as e:
                        print(f"Error creating role skill: {e}")
                    else:
                        Role_Skill_ID = d['Role_Skill_ID']
                        Role_ID = d['Role_ID']
                        Skill_Name = d['Skill_Name']
                        create_role_skill_table_sql = "INSERT INTO spm.Role_Skill_Table (Role_Skill_ID, Role_ID, Skill_Name) VALUES (%s, %s, %s)"
                        val = (Role_Skill_ID, Role_ID, Skill_Name)
                        self.repository.create(create_role_skill_table_sql, val)
            return "Success"

    def ingest_role_listing_table(self, file_name):
            with open (file_name, 'r') as json_file:
                data = json.load(json_file)
                for d in data: 
                    try:
                        RoleListingTable(**d)
                    except (TypeError, AttributeError) as e:
                        print(f"Error creating role listing: {e}")
                    else:
                        Role_Listing_ID = d['Role_Listing_ID']
                        Role_ID = d['Role_ID']
                        Dept = d['Dept']
                        Application_Deadline = d['Application_Deadline']
                        create_role_listing_table_sql = "INSERT INTO spm.Role_Listing_Table (Role_Listing_ID, Role_ID, Dept, Application_Deadline) VALUES (%s, %s, %s, %s)"
                        val = (Role_Listing_ID, Role_ID, Dept, Application_Deadline)
                        self.repository.create(create_role_listing_table_sql, val)
            return "Success"
    
    def ingest_role_listing_application_table(self, file_name):
            with open (file_name, 'r') as json_file:
                data = json.load(json_file)
                for d in data: 
                    try:
                        RoleApplicationTable(**d)
                    except (TypeError, AttributeError) as e:
                        print(f"Error creating role listing application: {e}")
                    else:
                        Role_Listing_App_ID = d['Role_Listing_App_ID']
                        Role_Listing_ID = d['Role_Listing_ID']
                        Applicant_ID = d['Applicant_ID']
                        create_role_listing_application_table_sql = "INSERT INTO spm.Role_Listing_Application_Table (Role_Listing_App_ID, Role_Listing_ID, Applicant_ID) VALUES (%s, %s, %s)"
                        val = (Role_Listing_App_ID, Role_Listing_ID, Applicant_ID)
                        self.repository.create(create_role_listing_application_table_sql, val)
            return "Success"

    def ingest_counter_table(self, file_name):
            with open (file_name, 'r') as json_file:
                data = json.load(json_file)
                for d in data: 
                    try:
                        CounterTable(**d)
                    except (TypeError, AttributeError) as e:
                        print(f"Error ingesting counter: {e}")
                    else:
                        Ct = d['CT']
                        Staff_ID_Counter = d['Staff_ID_Counter']
                        Role_ID_Counter = d['Role_ID_Counter']
                        Role_Listing_ID_Counter = d['Role_Listing_ID_Counter']
                        Staff_Skill_ID_Counter = d['Staff_Skill_ID_Counter']
                        Role_Skill_ID_Counter = d['Role_Skill_ID_Counter']
                        Role_Listing_App_ID_Counter = d['Role_Listing_App_ID_Counter']
                        create_counter_table_sql = "INSERT INTO spm.Counter_Table (CT, Staff_ID_Counter, Role_ID_Counter, Role_Listing_ID_Counter, Staff_Skill_ID_Counter, Role_Skill_ID_Counter, Role_Listing_App_ID_Counter) VALUES (%s, %s, %s, %s, %s, %s, %s)"
                        val = (Ct, Staff_ID_Counter, Role_ID_Counter, Role_Listing_ID_Counter, Staff_Skill_ID_Counter, Role_Skill_ID_Counter, Role_Listing_App_ID_Counter)
                        self.repository.create(create_counter_table_sql, val)
            return "Success"

    def testingcounter(self):
        print(self.repository.get_Role_ID_Counter())
        print(self.repository.get_Role_Listing_App_ID_Counter())
        print(self.repository.get_Role_Listing_ID_Counter())
        print(self.repository.get_Role_Skill_ID_Counter())
        print(self.repository.get_Staff_ID_Counter())
        print(self.repository.get_Staff_Skill_ID_Counter())
        return "Success"





    def create_role_posting(self, role_listings_json: RoleListingTable):
        start_time = time.time()
        try:
            Role_Name = role_listings_json.get('Role_Name')
            Role_Desc = role_listings_json.get('Role_Desc')
            Dept = role_listings_json.get('Dept')
            Application_Deadline = role_listings_json.get('Application_Deadline')
            Skill_Name = role_listings_json.get('Skill_Name')

            create_role_sql = '''
            INSERT INTO spm.Role_Table(Role_ID, Role_Name, Role_Desc) VALUES (%s, %s, %s)
            '''
            Role_ID = ''
            params = (Role_ID, Role_Name, Role_Desc)
            self.repository.create(create_role_sql, params)

            create_role_skill_sql = '''
            INSERT INTO spm.Role_Skill_Table (Role_Skill_ID, Role_ID, Skill_Name) VALUES (%s, %s, %s)
            '''
            # Insert Role_Name, Skill_Name, Application_Deadline and Role_Desc 
            # by joining Role_Skill and Role tables then passing in Application_Deadline

            # create_role_sql = '''
            #     INSERT INTO spm.Role_Listing (Role_Name, Skill_Name, Role_Desc, Application_Deadline) 
            #     SELECT rs.Role_Name, rs.Skill_Name, r.Role_Desc, %s
            #     FROM spm.Role_Skill rs
            #     INNER JOIN spm.Role r ON rs.Role_Name = r.Role_Name
            #     WHERE rs.Role_Name = %s
            # '''


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

    def update_role_posting(self, role_listings_json: RoleListingTable):
        start_time = time.time()
        try:
            Role_Name = role_listings_json.get('Role_Name')
            Skill_Name = role_listings_json.get('Skill_Name')
            Role_Desc = role_listings_json.get('Role_Desc')
            Application_Deadline = role_listings_json.get('Application_Deadline')
            Dept = role_listings_json.get('Dept')

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
        
    def delete_role_listing(self, role_listing_id):
        start_time = time.time()
        try:
            delete_role_sql = f"DELETE FROM spm.Role_Listing WHERE Role_Listing_ID = '{role_listing_id}'"
            
        except (AttributeError, TypeError, KeyError, ValueError) as e:
            print(f"An error occurred in delete_role_posting: {e}")
            return {}
        
        else:
            print("delete_role_posting Time taken in seconds: " + str(time.time()-start_time))
            return self.repository.delete(delete_role_sql)
