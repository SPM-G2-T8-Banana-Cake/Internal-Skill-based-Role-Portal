import pymssql

class SqlServicesWrapper:

    def __init__(self):
        self.host = 'is212g2t8db.cozufzqpaqz5.ap-southeast-1.rds.amazonaws.com'
        self.username = 'admin'
        self.password = 'PinguDevelopers123!'
        self.db = 'is212g2t8db'

        # Initialize the cursor when creating an instance
        self.conn = self.connection()
        self.cursor = self.conn.cursor()

    def connection(self):
        return pymssql.connect(self.host, self.username, self.password, self.db)
