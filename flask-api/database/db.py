"""
Miniburn API

Author: Vladimir Semenov
"""

from flask_mongoengine import MongoEngine

db = MongoEngine()

def initialize_db(app):
    """DB Initialization for Flask App"""
    db.init_app(app)
