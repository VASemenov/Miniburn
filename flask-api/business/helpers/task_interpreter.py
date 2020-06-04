from bson import ObjectId

def get_id(data):
  return ObjectId(data["_id"])
