import json
import time

from uuid import uuid4
from domain.models.role_postings import StaffTable, RoleTable, RoleListingTable, RoleApplicationTable, CounterTable
from domain.models.constants import STAFF_PREFIX, ROLE_LISTING_APPLICATION_PREFIX, ROLE_LISTING_PREFIX, ROLE_PREFIX
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
                    Skills = d['Skills']
                    create_staff_table_sql = "INSERT INTO spm.Staff_Table (Staff_ID, Staff_FName, Staff_LName, Dept, Country, Email, Access_Rights, Skills) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
                    val = (Staff_ID, Staff_FName, Staff_LName, Dept, Country, Email, Access_Rights, Skills)
                    self.repository.create(create_staff_table_sql, val)
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
                        Skills = d['Skills']
                        create_role_listing_table_sql = "INSERT INTO spm.Role_Listing_Table (Role_Listing_ID, Role_ID, Dept, Application_Deadline, Skills) VALUES (%s, %s, %s, %s, %s)"
                        val = (Role_Listing_ID, Role_ID, Dept, Application_Deadline, Skills)
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
                        Application_Status = d['Application_Status']
                        create_role_listing_application_table_sql = "INSERT INTO spm.Role_Listing_Application_Table (Role_Listing_App_ID, Role_Listing_ID, Applicant_ID, Application_Status) VALUES (%s, %s, %s, %s)"
                        val = (Role_Listing_App_ID, Role_Listing_ID, Applicant_ID, Application_Status)
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
                        Role_Listing_App_ID_Counter = d['Role_Listing_App_ID_Counter']
                        create_counter_table_sql = "INSERT INTO spm.Counter_Table (CT, Staff_ID_Counter, Role_ID_Counter, Role_Listing_ID_Counter, Role_Listing_App_ID_Counter) VALUES (%s, %s, %s, %s, %s)"
                        val = (Ct, Staff_ID_Counter, Role_ID_Counter, Role_Listing_ID_Counter, Role_Listing_App_ID_Counter)
                        self.repository.create(create_counter_table_sql, val)
            return "Success"

    def testingcounter(self):
        print(self.repository.get_Role_ID_Counter())
        print(self.repository.get_Role_Listing_App_ID_Counter())
        print(self.repository.get_Role_Listing_ID_Counter())
        print(self.repository.get_Staff_ID_Counter())
        return "Success"


    def create_role_listing(self, role_listings_json: RoleListingTable):
        start_time = time.time()
        try:
            Role_Name = role_listings_json.get('Role_Name')
            # print("Role_Name = " + Role_Name)
            Role_Desc = role_listings_json.get('Role_Desc')
            # print("Role_Desc = " + Role_Desc)
            Dept = role_listings_json.get('Dept')
            # print("Dept = " + Dept)
            Application_Deadline = role_listings_json.get('Application_Deadline')
            # print("Application_Deadline = " + Application_Deadline)
            Skills = role_listings_json.get('Skill_Name')
            # print("Skill_Name = " + Skill_Name)

            create_role_sql = '''
            INSERT INTO spm.Role_Table(Role_ID, Role_Name, Role_Desc) VALUES (%s, %s, %s)
            '''
            Role_ID = ROLE_PREFIX +str(self.repository.get_Role_ID_Counter())
            print("Role_ID = " + Role_ID)
            params = (Role_ID, Role_Name, Role_Desc)
            self.repository.create(create_role_sql, params)

            create_role_listing_sql = '''
            INSERT INTO spm.Role_Listing_Table (Role_Listing_ID, Role_ID, Dept, Application_Deadline, Skills) VALUES (%s ,%s, %s, %s, %s)
            '''
            Role_Listing_ID = ROLE_LISTING_PREFIX + str(self.repository.get_Role_Listing_ID_Counter())
            params = (Role_Listing_ID, Role_ID, Dept, Application_Deadline, Skills)
            self.repository.create(create_role_listing_sql, params)

        except (TypeError, AttributeError) as e:
            print(f"Error creating instance: {e}")
            return f"Error creating instance: {e}"
        else:
            time_taken = time.time() - start_time
            response_message = f"create_role_listing: Time taken in seconds: {time_taken}"
            print(response_message)
            return response_message

    def update_role_listing(self, role_listings_json: RoleListingTable):
        start_time = time.time()
        try:
            Role_ID = role_listings_json.get('Role_ID')
            Role_Listing_ID = role_listings_json.get('Role_Listing_ID')
            Role_Name = role_listings_json.get('Role_Name')
            Skills = role_listings_json.get('Skills')
            Role_Desc = role_listings_json.get('Role_Desc')
            Application_Deadline = role_listings_json.get('Application_Deadline')
            Dept = role_listings_json.get('Dept')

            update_sql = """
            BEGIN TRANSACTION;

            UPDATE spm.Role_Table 
            SET Role_Name = %(Role_Name)s, Role_Desc = %(Role_Desc)s 
            WHERE Role_ID = %(Role_ID)s;

            UPDATE spm.Role_Listing_Table 
            SET Dept = %(Dept)s, Application_Deadline = %(Application_Deadline)s, Skills = %(Skills)s 
            WHERE Role_ID = %(Role_ID)s AND Role_Listing_ID = %(Role_Listing_ID)s;

            COMMIT TRANSACTION;
            """
            params = {
                'Role_Name': Role_Name,
                'Role_Desc': Role_Desc,
                'Role_ID': Role_ID,
                'Skills': Skills,
                'Dept': Dept,
                'Application_Deadline': Application_Deadline,
                'Role_Listing_ID': Role_Listing_ID
            }
            self.repository.update(update_sql, params)

        except (TypeError, AttributeError) as e:
            print(f"Error updating instance: {e}")
            return f"Error updating instance: {e}"
        else:
            time_taken = time.time() - start_time
            response_message = f"update_role_listing: Time taken in seconds: {time_taken}"
            print(response_message)
            return response_message


    def hr_view_role_listings(self):
        start_time = time.time()
        try:
            read_role_sql = '''
                SELECT RT.Role_ID, RT.Role_Name, RT.Role_Desc, RLT.Skills, RLT.Dept, RLT.Role_Listing_ID, RLT.Application_Deadline
                FROM spm.Role_Table RT
                JOIN spm.Role_Listing_Table RLT ON RT.Role_ID = RLT.Role_ID
                '''
            res = self.repository.HRGetRoleListings(read_role_sql)
        except (AttributeError, TypeError, KeyError, ValueError) as e:
            print(f"An error occurred in view_role_listings: {e}")
            return {}
        
        else:
            print("view_role_listings Time taken in seconds: " + str(time.time()-start_time))
            return res


    def staff_view_role_listings(self, staffID):

        start_time = time.time()
        try:
            staff_skill_sql = f"SELECT Skills from spm.Staff_Table where Staff_ID = '{staffID}'"
            res = self.repository.getStaffSkills(staff_skill_sql)
            print()
            print()
            print()
            print()
            print("FINDING RES")
            print()
            print()
            print()
            print()
            print(res)
            print()
            print()
            print()
            print()
            print()
            read_role_sql = '''
                SELECT RT.Role_ID, RT.Role_Name, RT.Role_Desc, RLT.Skills, RLT.Dept, RLT.Role_Listing_ID, RLT.Application_Deadline
                FROM spm.Role_Table RT
                JOIN spm.Role_Listing_Table RLT ON RT.Role_ID = RLT.Role_ID
                '''
            res2 = self.repository.StaffGetRoleListings(read_role_sql, res)

        except (AttributeError, TypeError, KeyError, ValueError) as e:
            print(f"An error occurred in view_role_listings: {e}")
            return {}
        
        else:
            print("view_role_listings Time taken in seconds: " + str(time.time()-start_time))
            return res2

    def view_applicants_skills(self):
        start_time = time.time()
        try:
            get_applicants_skills_sql = '''
                SELECT
                    r.Role_Name, 
                    r.Role_Desc,
                    st.Staff_FName,
                    st.Staff_LName,
                    st.Skills AS Staff_Skills,
                    st.Staff_ID,
                    rlt.Skills AS Role_Skills
                FROM
                    spm.Role_Table r
                INNER JOIN
                    spm.Role_Listing_Table rlt ON r.Role_ID = rlt.Role_ID
                INNER JOIN
                    spm.Role_Listing_Application_Table rlat ON rlt.Role_Listing_ID = rlat.Role_Listing_ID
                INNER JOIN
                    spm.Staff_Table st ON rlat.Applicant_ID = st.Staff_ID;

            '''
            res = self.repository.getSkills(get_applicants_skills_sql)

        except (AttributeError, TypeError, KeyError, ValueError) as e:
            print(f"An error occurred in get_applicants_skills_sql: {e}")
            return {}
        else:
            print("get_applicants_skills_sql Time taken in seconds: " + str(time.time()-start_time))
            return res
        
    def view_applicant_skills(self, staffID):
        start_time = time.time()
        try:
            get_applicant_skills_sql = f'''
                 SELECT
                    st.Skills AS Staff_Skills
                FROM
					spm.Staff_Table st
                WHERE st.Staff_ID = '{staffID}'
                ;

            '''
            res = self.repository.getSkills(get_applicant_skills_sql)

        except (AttributeError, TypeError, KeyError, ValueError) as e:
            print(f"An error occurred in get_applicant_skills_sql: {e}")
            return {}
        else:
            print("get_applicant_skills_sql Time taken in seconds: " + str(time.time()-start_time))
            return res

    def delete_role_listing(self, role_listing_id):
        start_time = time.time()
        try:
            delete_role_sql = f"DELETE FROM spm.Role_Listing_Table WHERE Role_Listing_ID = '{role_listing_id}'"
        except (AttributeError, TypeError, KeyError, ValueError) as e:
            print(f"An error occurred in delete_role_listing: {e}")
            return {} 
        else:
            print("delete_role_listing Time taken in seconds: " + str(time.time()-start_time))
            return self.repository.delete(delete_role_sql)
        
    def create_role_application(self, role_app_json: RoleApplicationTable):
            start_time = time.time()
            try:
                Role_Listing_App_ID = ROLE_LISTING_APPLICATION_PREFIX +str(self.repository.get_Role_Listing_App_ID_Counter())
                Role_Listing_ID = role_app_json.get('Role_Listing_ID')
                Applicant_ID = role_app_json.get('Applicant_ID')
                Application_Status = "Pending"

                create_app_sql = '''
                INSERT INTO spm.Role_Listing_Application_Table 
                (Role_Listing_App_ID, Role_Listing_ID, Applicant_ID, Application_Status) 
                VALUES (%s, %s, %s, %s)
                '''
                params = (Role_Listing_App_ID, Role_Listing_ID, Applicant_ID, Application_Status)
                self.repository.create(create_app_sql, params)

            except (TypeError, AttributeError) as e:
                print(f"Error creating instance: {e}")
                return f"Error creating instance: {e}"
            else:
                time_taken = time.time() - start_time
                response_message = f"create_app: Time taken in seconds: {time_taken}"
                print(response_message)
                return response_message