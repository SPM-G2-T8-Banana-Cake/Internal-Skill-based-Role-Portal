from flask import Flask
from flask_cors import CORS

from routes.test_api import test_api
from routes.role_postings_api import role_postings_api

app = Flask(__name__)
app.register_blueprint(test_api)
app.register_blueprint(role_postings_api)

cors = CORS(app)

if __name__ == "__main__":
    app.run(debug=True)
