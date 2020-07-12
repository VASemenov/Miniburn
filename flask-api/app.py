"""
Miniburn API

Author: Vladimir Semenov
"""

import os

from exceptions.exceptions import handle_exceptions

from flask import Flask, request
from flask_cors import CORS

from dotenv import load_dotenv

from database.models.project import Project
from database.models.task import Task
from database.db import initialize_db

from business.crud import create, update, read, delete
from business.helpers.task_interpreter import get_id
load_dotenv()

app = Flask(__name__)
CORS(app)


if os.getenv("ENV") == 'prod':
    PASSWORD = os.getenv("MONGO_PASSWORD")
    DB_NAME = os.getenv("MONGO_DB")
    URL = "mongodb+srv://Subatiq:" + PASSWORD + \
        "@miniburncluster.u8oil.gcp.mongodb.net/" + DB_NAME + \
        "?retryWrites=true&w=majority"

    app.config['MONGODB_SETTINGS'] = {
        'host': URL,
    }
else:
    app.config['MONGODB_SETTINGS'] = {
        'db': os.getenv("MONGO_DB"),
        'host': os.getenv("MONGO_HOST"),
        'port': int(os.getenv("MONGO_PORT"))
    }

app.config['CORS_HEADERS'] = 'Content-Type'

initialize_db(app)


@app.route('/')
def hello_world():
    """Standard response"""
    print("Access")
    return 'Welcome'


@app.before_request
def request_filter(): # pylint: disable=R1710
    """Check if request is valid"""
    if request.method != "OPTIONS":
        errors = handle_exceptions(request)

        if errors:
            return errors


# READ
@app.route('/api/projects/read', methods=["POST"])
def get_projects():
    """Read project by filter"""
    return read(Project, request.get_json()), 200


@app.route('/api/tasks/read', methods=["POST"])
def get_tasks():
    """Read tasks by filter"""
    res = read(Task, request.get_json())
    print(res)
    return read(Task, request.get_json()), 200


# CREATE
@app.route('/api/projects/create', methods=["POST"])
def create_project():
    """Create new project with passed parameters"""
    data = request.get_json()
    if "isStarted" not in data.keys():
        data["isStarted"] = False
    if "isFinished" not in data.keys():
        data["isFinished"] = False
    create(Project, request.get_json())

    return "OK"


@app.route('/api/tasks/create', methods=["POST"])
def create_task():
    """Create new task with passed parameters"""
    new_id = create(Task, request.get_json())

    return new_id, 200


# UPDATE
@app.route('/api/projects/update', methods=["POST"])
def update_project():
    """Update project with passed parameters"""
    data = request.get_json()
    update(Task, data, {"_id": get_id(data)})

    return "OK"


@app.route('/api/tasks/update', methods=["POST"])
def update_task():
    """Update task with passed parameters"""
    data = request.get_json()
    update(Task, data, {"_id": get_id(data)})

    return "OK"


# DELETE
@app.route('/api/projects/delete', methods=["POST"])
def delete_project():
    """Delete project by id"""
    data = request.get_json()
    delete(Project, {"_id": get_id(data)})

    return "OK"


@app.route('/api/tasks/delete', methods=["POST"])
def delete_task():
    """Delete task by id"""
    data = request.get_json()
    delete(Task, {"_id": get_id(data)})

    return "OK"


@app.after_request
def add_access_headers(response):
    """Add CORS headers to each response"""
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
        )

    return response


if __name__ == '__main__':
    app.run(debug=True)
