from bson import ObjectId
from flask import jsonify


def create(collection, data):
  new = collection(**data)
  new.save()


def update(collection, data, _filter={}):
  data.pop("_id")
  print(_filter, data)
  collection.objects(**_filter).update_one(**data)


def read(collection, _filter={}, get_first=False):
  return jsonify(collection.objects(**_filter)) if not get_first else jsonify(collection.objects(**_filter).first())


def delete(collection, _filter={}):
  collection.objects(**_filter).delete()
