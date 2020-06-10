from database.db import db

class Task(db.DynamicDocument):
  name = db.StringField(required=True)
  done = db.BooleanField(required=True)
  weight = db.IntField(requrired=True)
  status = db.StringField()
  projectId = db.StringField()

  meta = {'collection': 'tasks'}

