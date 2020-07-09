"""
Miniburn API
CRUD functions

Author: Vladimir Semenov
"""

from database.db import db

# pylint: disable=E1101
class Project(db.DynamicDocument):
    """Project collection model"""
    name = db.StringField(required=True)
    goal = db.StringField()
    password = db.StringField()
    isStarted = db.BooleanField()
    isFinished = db.BooleanField()
    startedAt = db.DateTimeField()
    deadline = db.DateTimeField()

    meta = {'collection': 'projects'}
