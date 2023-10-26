from flask import Flask
from flask_cors import CORS
from flask_apscheduler import APScheduler
import requests

from routes.test_api import test_api
from routes.role_postings_api import role_postings_api

app = Flask(__name__)
app.register_blueprint(test_api)
app.register_blueprint(role_postings_api)
scheduler = APScheduler()
scheduler.api_enabled = True
scheduler.init_app(app)
scheduler.start()

@scheduler.task('interval', id='schedule_send_recommender_email', seconds=10, misfire_grace_time=900)
# @scheduler.task('cron', id='schedule_send_recommender_email', week='*', day_of_week='mon', hour=9, minute=0)
def cron_update_staff_hrms(url = "http://localhost:5000/cron_update_staff_hrms"):
    return requests.get(url)

cors = CORS(app)

if __name__ == "__main__":
    app.run(debug=True)
