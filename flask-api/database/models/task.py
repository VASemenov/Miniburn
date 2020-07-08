from database.db import db

class Task(db.DynamicDocument):
  text = db.StringField(required=True)
  done = db.BooleanField(required=True)
  weight = db.IntField(requrired=True)
  status = db.StringField()
  projectId = db.StringField()
  deleted = db.BooleanField()

  meta = {'collection': 'tasks'}

