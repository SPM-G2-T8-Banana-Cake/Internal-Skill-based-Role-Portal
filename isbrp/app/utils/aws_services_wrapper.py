import pymssql

class SqlServicesWrapper:

    def __init__(self):
        self.host = 'is212g2t8db.cozufzqpaqz5.ap-southeast-1.rds.amazonaws.com'
        self.username = 'admin'
        self.password = ''
        self.db = 'is212g2t8db'

        # Initialize the cursor when creating an instance
        self.conn = self.connection()
        self.cursor = self.conn.cursor()

    def connection(self):
        return pymssql.connect(self.host, self.username, self.password, self.db)

# print(app_sql_wrapper)
# app_sql_wrapper.cursor.execute('SELECT * FROM spm.Staff')
# rows = app_sql_wrapper.cursor.fetchall()

# for row in rows:
#     print(row)

# # Sample SELECT query for the Role_Skill table
# app_sql_wrapper.cursor.execute('SELECT * FROM spm.Role_Skill')
# rows = app_sql_wrapper.cursor.fetchall()

# # Display the results
# for row in rows:
#     print(row)

# # Sample SELECT query for the Staff_Skill table
# app_sql_wrapper.cursor.execute('SELECT * FROM spm.Staff_Skill')
# rows = app_sql_wrapper.cursor.fetchall()

# # Display the results
# for row in rows:
#     print(row)

# # Close cursor and connection
# app_sql_wrapper.cursor.close()
# app_sql_wrapper.conn.close()