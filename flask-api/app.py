import os
import json
from bson import ObjectId

from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine

from database.models.project import Project
from database.models.task import Task
from database.db import initialize_db

from business.crud import create, update, read, delete
from business.helpers.task_interpreter import get_id

from exceptions.exceptions import handle_exceptions


app = Flask(__name__)

app.config['MONGODB_SETTINGS'] = {
  'db': 'miniburn',
  'host': 'localhost',
  'port': 27017
}

initialize_db(app)


@app.route('/')
def hello_world():
		return 'Welcome'


@app.before_request
def request_filter():
  errors = handle_exceptions(request)

  if errors:
    return errors


# READ
@app.route('/api/projects/read', methods=["POST"])
def get_projects():
  return read(Project, request.get_json())


@app.route('/api/tasks/read', methods=["POST"])
def get_tasks():
  return read(Task, request.get_json())


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
  create(Task, request.get_json())

  return "OK"


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
  delete(Project, data, {"_id": get_id(data)})

  return "OK"


@app.route('/api/tasks/delete', methods=["POST"])
def delete_task():
  data = request.get_json()
  delete(Task, data, {"_id": get_id(data)})

  return "OK"

if __name__ == '__main__':
  app.run(debug=True)
