from infrastructure.repos.interfaces.repo_interfaces import IJsParticularsRepository

class JsParticularsRepository(IJsParticularsRepository):
    def __init__(self, client) -> None:
        self.client = client

    def create(self, params: dict):
        res = self.client.put_item(**params)
        return res

    def get(self, params: dict):
        res = self.client.query(**params)
        return res
    
    def update(self, params: dict):
        res = self.client.update_item(**params)
        return res
    
    def delete(self, params: dict):
        res = self.client.delete_item(**params)
        return res

    
