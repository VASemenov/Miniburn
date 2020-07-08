import os
import json
from bson.objectid import ObjectId

import flask
from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine
from flask_cors import CORS

from database.models.project import Project
from database.models.task import Task
from database.db import initialize_db

from business.crud import create, update, read, delete
from business.helpers.task_interpreter import get_id

from exceptions.exceptions import handle_exceptions

from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, send_wildcard=True)

app.config['MONGODB_SETTINGS'] = {
  'db': os.getenv("MONGO_DB"),
  'host': os.getenv("MONGO_HOST"),
  'port': int(os.getenv("MONGO_PORT"))
}

initialize_db(app)


@app.route('/')
def hello_world():
		return 'Welcome'


@app.before_request
def request_filter():
  if request.method == "OPTIONS":
    pass
  else:
    print(request.headers)
    print(request.data)
    print(request.get_json(force=False, silent=True, cache=True))
    errors = handle_exceptions(request)

    if errors:
      return errors

# @app.before_request
# def print_request():
#   pass


# READ
@app.route('/api/projects/read', methods=["POST"])
def get_projects():
  return read(Project,  request.get_json()), 200


@app.route('/api/tasks/read', methods=["POST"])
def get_tasks():
  res = read(Task, request.get_json())
  print(res)
  return read(Task, request.get_json()), 200


# CREATE
@app.route('/api/projects/create', methods=["POST"])
def create_project():
  data = request.get_json()
  if "isStarted" not in data.keys():
    data["isStarted"] = False
  if "isFinished" not in data.keys():
    data["isFinished"] = False
  create(Project, request.get_json())

  return "OK"


@app.route('/api/tasks/create', methods=["POST"])
def create_task():
  new_id = create(Task, request.get_json())

  return new_id, 200


# UPDATE
@app.route('/api/projects/update', methods=["POST"])
def update_project():
  data = request.get_json()
  update(Task, data, {"_id": get_id(data)})

  return "OK"


@app.route('/api/tasks/update', methods=["POST"])
def update_task():
  data = request.get_json()
  update(Task, data, {"_id": get_id(data)})

  return "OK"


# DELETE
@app.route('/api/projects/delete', methods=["POST"])
def delete_project():
  data = request.get_json()
  delete(Project, {"_id": get_id(data)})

  return "OK"


@app.route('/api/tasks/delete', methods=["POST"])
def delete_task():
  data = request.get_json()
  delete(Task, {"_id": get_id(data)})

  return "OK"


@app.after_request
def add_access_headers(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Methods', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  # response.h eaders.add('Access-Control-Allow-Credentials', 'true')
  return response


if __name__ == '__main__':
  app.run(debug=True)
