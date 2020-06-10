from flask import Flask, request, jsonify
from tokens.token_generator import generate_token


import os


app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/get_time', methods=["POST"])
def auth():
  header = request.header
  payload = request.json

  project = payload.project_id


  return '200'




