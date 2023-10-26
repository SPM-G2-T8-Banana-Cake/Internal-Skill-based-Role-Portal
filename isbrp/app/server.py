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

# @scheduler.task('interval', id='cron_update_staff_hrms', seconds=2, misfire_grace_time=500)
@scheduler.task('cron', id='cron_update_staff_hrms', week='*', day_of_week='tue,wed,thu,fri,sat', hour=0, minute=1)
def cron_update_staff_hrms(url = "http://localhost:5000/cron_update_staff_hrms"):
    return requests.get(url, timeout=10000)

# @scheduler.task('interval', id='cron_update_staff_skill_lms', seconds=3, misfire_grace_time=500)
@scheduler.task('cron', id='cron_update_staff_skill_lms', week='*', day_of_week='tue,wed,thu,fri,sat', hour=0, minute=2)
def cron_update_staff_skill_lms(url = "http://localhost:5000/cron_update_staff_skill_lms"):
    return requests.get(url, timeout=10000)

# @scheduler.task('interval', id='cron_update_role_skill_ljps', seconds=4, misfire_grace_time=500)
@scheduler.task('cron', id='cron_update_role_skill_ljps', week='*', day_of_week='tue,wed,thu,fri,sat', hour=0, minute=3)
def cron_update_role_skill_ljps(url = "http://localhost:5000/cron_update_role_skill_ljps"):
    return requests.get(url, timeout=10000)

cors = CORS(app)

if __name__ == "__main__":
    app.run(debug=True)
