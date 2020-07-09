"""
Miniburn API

Author: Vladimir Semenov
"""

from database.db import db

# pylint: disable=E1101
class Task(db.DynamicDocument):
    """Task collection model"""
    text = db.StringField(required=True)
    done = db.BooleanField(required=True)
    weight = db.IntField(requrired=True)
    status = db.StringField()
    projectId = db.StringField()
    deleted = db.BooleanField()

    meta = {'collection': 'tasks'}
