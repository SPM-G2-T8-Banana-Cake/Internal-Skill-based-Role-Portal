import json
import time

from uuid import uuid4
from domain.models.role_postings import StaffTable, RoleTable, RoleListingTable, RoleApplicationTable, CounterTable
from domain.models.constants import STAFF_PREFIX, ROLE_LISTING_APPLICATION_PREFIX, ROLE_LISTING_PREFIX, ROLE_PREFIX
from infrastructure.repos.role_postings_repo import RolePostingsRepository
from utils.aws_services_wrapper import SqlServicesWrapper
import paramiko
import pandas as pd
from pandas.errors import EmptyDataError
import os
from passlib.hash import pbkdf2_sha256

class RolePostingsService(RolePostingsRepository):
    def __init__(self, role_postings_repo : RolePostingsRepository) -> None:
        self.repository = role_postings_repo

    def connect_to_remote_system(self):
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(os.environ.get('REMOTE_SSH_HOST_IPADDR'),
                    username = os.environ.get('REMOTE_SSH_HOST_USERNAME'),
                    password = os.environ.get('REMOTE_SSH_HOST_PASSWORD'))

        # Define the path to the CSV file on the remote system
        remote_csv_path = '/home/peterwjy/cron_data/staff_details.csv'
        return ssh, remote_csv_path
    
    def download_csv_from_remote(self):
        ssh, remote_csv_path = self.connect_to_remote_system()
        local_csv_path = './cron_data/staff.csv'
        try:
            sftp = ssh.open_sftp()
            sftp.get(remote_csv_path, local_csv_path)
            sftp.close()
            ssh.close()
            return "Success download: staff.csv"
        
        except FileNotFoundError as e:
            print(f"Error: {e}")

    def extract_csv_to_arr(self, filepath):
        try:
            df = pd.read_csv(filepath, encoding='latin1')
            df = df.where(pd.notnull(df), None)
            df = df.to_dict('records')
            return df
        except EmptyDataError as e: 
            print("Caught EmptyDataError: The CSV file is empty.")

    def cron_update_staff_hrms(self, staff_csv_arr=None, filepath='./cron_data/staff.csv'):
        # Deletes all items from staff table every night and re-ingest from csv
        # - Add to database. Add item with staff_ID using id from hrms
        # - Item contains all field except for skills. Skills column set as empty
        try:
            if staff_csv_arr is None:
                staff_csv_arr = self.extract_csv_to_arr(filepath)
            for staff in staff_csv_arr:
                staff_ID = staff['Staff_ID']
                res = self.get_staff(staff_ID)
                if res != {}:
                    update_sql = '''
                    UPDATE spm.Staff_Table 
                    SET Staff_FName = %(Staff_FName)s, Staff_LName = %(Staff_LName)s,
                        Dept = %(Dept)s, Country = %(Country)s, Email = %(Email)s,
                        Access_Rights = %(Access_Rights)s, 'Role': staff['Role']
                    WHERE Staff_ID = %(Staff_ID)s;
                    '''
                    params = {
                        'Staff_FName': staff['Staff_FName'],
                        'Staff_LName': staff['Staff_LName'],
                        'Dept': staff['Dept'],
                        'Country': staff['Country'],
                        'Email': staff['Email'],
                        'Access_Rights' : staff['Access_Rights'],
                        'Role': staff['Role']
                    }
                self.repository.update(update_sql, params)
            return {}
        except Exception as e:
            print(f"An error occurred: {str(e)}")

    def cron_update_staff_skills_lms(self, staff_csv_arr=None, filepath='./cron_data/staff.csv'):
        # Checks if staff ID exists in staff table
        # - If not exist, add to database, set other fields as Empty. Set staff_ID using id from lms
        # - If exist, update existing record matching staff_ID from lms for skills
        try:
            if staff_csv_arr is None:
                staff_csv_arr = self.extract_csv_to_arr(filepath)
            for staff in staff_csv_arr:
                staff_ID = staff['Staff_ID']
                res = self.get_staff(staff_ID)
                print(res)
            return {}
        except Exception as e:
            print(f"An error occurred: {str(e)}")

    def cron_update_role_ljps(self, role_csv_arr=None, filepath='../cron_data/staff.csv'):
        # Checks if role exists in role_listing table based on Role_ID instead of Role_Listing_ID
        # - If not exist, add to database
        # - If exist
        staff_csv_arr = self.extract_csv_to_arr(filepath)
        return staff_csv_arr


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
                    Skills = d['Skills']
                    create_role_table_sql = "INSERT INTO spm.Role_Table (Role_ID, Role_Name, Role_Desc, Skills) VALUES (%s, %s, %s, %s)"
                    val = (Role_ID, Role_Name, Role_Desc, Skills)
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
            INSERT INTO spm.Role_Table(Role_ID, Role_Name, Role_Desc, Skills) VALUES (%s, %s, %s, %s)
            '''
            Role_ID = ROLE_PREFIX +str(self.repository.get_Role_ID_Counter())
            print("Role_ID = " + Role_ID)
            params = (Role_ID, Role_Name, Role_Desc, Skills)
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
            SET Role_Name = %(Role_Name)s, Role_Desc = %(Role_Desc)s, Skills=%(Skills)s 
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
        
    def get_staff(self, staff_ID):
        try:
            sql_query = f"SELECT st.Dept AS Staff_Dept FROM spm.Staff_Table st WHERE st.Staff_ID = '{staff_ID}'"
            res = self.repository.getStaff(sql_query)
        except (AttributeError, TypeError, KeyError, ValueError) as e:
            print(f"An error occurred in delete_role_listing: {e}")
        else:
            print("delete_role_listing Time taken in seconds: ")
            return res
        
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