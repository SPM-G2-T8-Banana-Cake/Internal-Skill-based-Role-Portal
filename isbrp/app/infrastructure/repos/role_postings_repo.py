from infrastructure.repos.interfaces.repo_interfaces import IRolePostingsRepository

class RolePostingsRepository(IRolePostingsRepository):
    def __init__(self, cursor) -> None:
        self.cursor = cursor

    def create(self, sql_query: str, params=None):
        self.cursor.execute(sql_query, params)
        self.cursor.connection.commit()
        return "Created Role Posting Success"

    def get(self, params: str):
        res = self.cursor.execute(**params)
        return res
    
    def update(self, sql_query: str, params=None):
        self.cursor.execute(sql_query, params)
        self.cursor.connection.commit()
        return "Updated Role Posting Success"
    
    def delete(self, params: dict):
        res = self.cursor.execute(**params)
        return res

    
