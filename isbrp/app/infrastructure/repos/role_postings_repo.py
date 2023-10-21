from infrastructure.repos.interfaces.repo_interfaces import IRolePostingsRepository
import math
class RolePostingsRepository(IRolePostingsRepository):
    def __init__(self, cursor) -> None:
        self.cursor = cursor

    def create(self, sql_query: str, params=None):
        self.cursor.execute(sql_query, params)
        self.cursor.connection.commit()
        return "Created Success"

    def get(self, sql_query: str, params=None):
        res = self.cursor.execute(sql_query, params)
        return res
    
    def update(self, sql_query: str, params=None):
        self.cursor.execute(sql_query, params)
        self.cursor.connection.commit()
        return "Updated Role Listing Success"
    
    def delete(self, params: dict):
        res = self.cursor.execute(**params)
        self.cursor.connection.commit()
        return res

    def get_Staff_ID_Counter(self):
        sql_statement = '''
        SELECT Staff_ID_Counter from spm.Counter_Table where CT = 1
        '''
        self.cursor.execute(sql_statement)
        Staff_ID_Counters = self.cursor.fetchall()

        if Staff_ID_Counters:
            for Staff_ID_Counter in Staff_ID_Counters:
                old_counter = Staff_ID_Counter[0]
                new_counter = int(old_counter) + 1
                update_statement = '''
                UPDATE spm.Counter_Table set Staff_ID_Counter = (%s) where CT = 1
                '''
                val = (new_counter)
                self.update(update_statement, val)
                return old_counter
        else:
            print("No Staff_ID_Counter exists")

    def get_Role_ID_Counter(self):
        sql_statement = '''
        SELECT Role_ID_Counter from spm.Counter_Table where CT = 1
        '''
        self.cursor.execute(sql_statement)
        Role_ID_Counters = self.cursor.fetchall()

        if Role_ID_Counters:
            for Role_ID_Counter in Role_ID_Counters:
                old_counter = Role_ID_Counter[0]
                new_counter = int(old_counter) + 1
                update_statement = '''
                UPDATE spm.Counter_Table set Role_ID_Counter = (%s) where CT = 1
                '''
                val = (new_counter)
                self.update(update_statement, val)
                return old_counter
                
        else:
            print("No Role_ID_Counter exists")


    def get_Role_Listing_ID_Counter(self):
        sql_statement = '''
        SELECT Role_Listing_ID_Counter from spm.Counter_Table where CT = 1
        '''
        self.cursor.execute(sql_statement)
        Role_Listing_ID_Counters = self.cursor.fetchall()

        if Role_Listing_ID_Counters:
            for Role_Listing_ID_Counter in Role_Listing_ID_Counters:
                old_counter = Role_Listing_ID_Counter[0]
                new_counter = int(old_counter) + 1
                update_statement = '''
                UPDATE spm.Counter_Table set Role_Listing_ID_Counter = (%s) where CT = 1
                '''
                val = (new_counter)
                self.update(update_statement, val)
                return old_counter
        else:
            print("No Role_Listing_ID_Counter exists")



    def get_Role_Listing_App_ID_Counter(self):
        sql_statement = '''
        SELECT Role_Listing_App_ID_Counter from spm.Counter_Table where CT = 1
        '''
        self.cursor.execute(sql_statement)
        Role_Listing_App_ID_Counters = self.cursor.fetchall()

        if Role_Listing_App_ID_Counters:
            for Role_Listing_App_ID_Counter in Role_Listing_App_ID_Counters:
                old_counter = Role_Listing_App_ID_Counter[0]
                new_counter = int(old_counter) + 1
                update_statement = '''
                UPDATE spm.Counter_Table set Role_Listing_App_ID_Counter = (%s) where CT = 1
                '''
                val = (new_counter)
                self.update(update_statement, val)
                return old_counter
        else:
            print("No Role_Listing_App_ID_Counter exists")

    def StaffGetRoleListings(self, sql_query, staffskills):
        res = self.cursor.execute(sql_query)
        results = self.cursor.fetchall()
        result_array = []
        counter = 1
        if results:
            for res in results:
                result_obj = {}
                result_obj['Role_ID'] = res[0]
                result_obj['Role_Name'] = res[1]
                result_obj['Role_Desc'] = res[2]
                result_obj['Required_Skills'] = res[3]
                result_obj['Dept'] = res[4]
                result_obj['Role_Listing_ID'] = res[5]
                result_obj['Application_Deadline'] = res[6]
                result_obj["Staff_Skills"] = staffskills
                skillsmatchcounter = 0
                required_skills_array = []
                if "," in res[3]:
                    required_skills = res[3].split(",")
                    max_number_of_required_skills = len(required_skills)
                    for skill in required_skills:
                        required_skills_array.append(skill.strip())
                else:
                    max_number_of_required_skills = 1
                    required_skills_array.append(res[3])

                if len(staffskills) > 0:
                    staff_skill_array = staffskills[0].split(",")
                    for skill in staff_skill_array:
                        if skill.strip() in required_skills_array:
                            skillsmatchcounter += 1
                else:
                    if staffskills[0].strip() in required_skills_array:
                        skillsmatchcounter += 1
                counter += 1

                skill_match = math.ceil(skillsmatchcounter / max_number_of_required_skills * 100)
                result_obj['Skill_Match'] = skill_match
                result_array.append(result_obj)
        return result_array
    
    def HRGetRoleListings(self, sql_query):
        res = self.cursor.execute(sql_query)
        results = self.cursor.fetchall()
        result_array = []
        if results:
            for res in results:
                result_obj = {}
                result_obj['Role_ID'] = res[0]
                result_obj['Role_Name'] = res[1]
                result_obj['Role_Desc'] = res[2]
                result_obj['Required_Skills'] = res[3]
                result_obj['Dept'] = res[4]
                result_obj['Role_Listing_ID'] = res[5]
                result_obj['Application_Deadline'] = res[6]
                result_array.append(result_obj)
        return result_array

    def getStaffSkills(self,sql_query):
        res = self.cursor.execute(sql_query)
        results = self.cursor.fetchall()
        result_array = []
        if results:
            for res in results:
                result_array.append(res[0])
        return result_array



    def getSkills(self, sql_query):
        res = self.cursor.execute(sql_query)
        results = self.cursor.fetchall()
        result_array = []
        if results:
            for res in results:
                result_obj = {}
                result_obj['Role_Name'] = res[0]
                result_obj['Role_Desc']=res[1]
                result_obj['Staff_Name'] = res[2] + " " + res[3]
                result_obj['Staff_Skills'] = res[4]
                result_obj['Staff_ID'] = res[5]
                result_obj['Role_Skills'] = res[6]
                result_array.append(result_obj)
        return result_array
    