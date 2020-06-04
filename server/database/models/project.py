from database.db import db

class Project(db.DynamicDocument):
  name = db.StringField(required=True)
  goal = db.StringField()
  password = db.StringField()
  isStarted = db.BooleanField()
  isFinished = db.BooleanField()
  startedAt = db.DateTimeField()
  deadline = db.DateTimeField()

  meta = {'collection': 'projects'}

