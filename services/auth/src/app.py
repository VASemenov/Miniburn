from flask import Flask, request, jsonify
from tokens.token_generator import generate_token


import os


app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/auth', methods=["POST"])
def auth():
  header = request.header
  content = request.json
  content.alg

  print(content)
  return '200'




