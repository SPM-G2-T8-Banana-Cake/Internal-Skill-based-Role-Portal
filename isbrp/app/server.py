from flask import Flask
from flask_cors import CORS

from routes.test_api import test_api
from routes.js_particulars_api import js_particulars_api

app = Flask(__name__)
app.register_blueprint(test_api)
app.register_blueprint(js_particulars_api)

cors = CORS(app)

if __name__ == "__main__":
    app.run(debug=True)
