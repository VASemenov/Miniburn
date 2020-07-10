"""
Miniburn frontend server

Author: Vladimir Semenov
"""
# import configparser
from flask import Flask, render_template

app = Flask(__name__)
# app.config['DEBUG'] = app_mode['Debug']

@app.route('/')
def hello_world():
    """Render Angular application"""
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
