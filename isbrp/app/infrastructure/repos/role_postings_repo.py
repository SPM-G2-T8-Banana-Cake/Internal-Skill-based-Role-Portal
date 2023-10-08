from infrastructure.repos.interfaces.repo_interfaces import IRolePostingsRepository

class RolePostingsRepository(IRolePostingsRepository):
    def __init__(self, cursor) -> None:
        self.cursor = cursor

    def create(self, sql_query: str, params=None):
        self.cursor.execute(sql_query, params)
        self.cursor.connection.commit()
        return "Created Role Posting Success"

    def get(self, sql_query: str, params=None):
        res = self.cursor.execute(sql_query, params)
        return res
    
    def update(self, sql_query: str, params=None):
        self.cursor.execute(sql_query, params)
        self.cursor.connection.commit()
        return "Updated Role Posting Success"
    
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
                return Staff_ID_Counter[0]
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
                return Role_ID_Counter[0]
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
                return Role_Listing_ID_Counter[0]
        else:
            print("No Role_Listing_ID_Counter exists")


    def get_Staff_Skill_ID_Counter(self):
        sql_statement = '''
        SELECT Staff_Skill_ID_Counter from spm.Counter_Table where CT = 1
        '''
        self.cursor.execute(sql_statement)
        Staff_Skill_ID_Counters = self.cursor.fetchall()

        if Staff_Skill_ID_Counters:
            for Staff_Skill_ID_Counter in Staff_Skill_ID_Counters:
                return Staff_Skill_ID_Counter[0]
        else:
            print("No Staff_Skill_ID_Counter exists")


    def get_Role_Skill_ID_Counter(self):
        sql_statement = '''
        SELECT Role_Skill_ID_Counter from spm.Counter_Table where CT = 1
        '''
        self.cursor.execute(sql_statement)
        Role_Skill_ID_Counters = self.cursor.fetchall()

        if Role_Skill_ID_Counters:
            for Role_Skill_ID_Counter in Role_Skill_ID_Counters:
                return Role_Skill_ID_Counter[0]
        else:
            print("No Role_Skill_ID_Counter exists")

    def get_Role_Listing_App_ID_Counter(self):
        sql_statement = '''
        SELECT Role_Listing_App_ID_Counter from spm.Counter_Table where CT = 1
        '''
        self.cursor.execute(sql_statement)
        Role_Listing_App_ID_Counters = self.cursor.fetchall()

        if Role_Listing_App_ID_Counters:
            for Role_Listing_App_ID_Counter in Role_Listing_App_ID_Counters:
                return Role_Listing_App_ID_Counter[0]
        else:
            print("No Role_Listing_App_ID_Counter exists")

