"""
Miniburn API
CRUD functions

Author: Vladimir Semenov
"""

from flask import jsonify

def create(collection, data):
    """Create new entry with data in the collection"""
    new = collection(**data)
    new.save()
    return jsonify({"_id": str(new.id)})


# pylint: disable=W0102
def update(collection, data, _filter={}):
    """Update entry chosen by filter in the collection
    with data"""
    data.pop("_id")
    print(_filter, data)
    collection.objects(**_filter).update_one(**data)


# pylint: disable=W0102
def read(collection, _filter={}, get_first=False):
    """Read filtered entries"""
    if not get_first:
        return jsonify(collection.objects(**_filter))
    return jsonify(collection.objects(**_filter).first())


# pylint: disable=W0102
def delete(collection, _filter={}):
    """Delete by filter"""
    collection.objects(**_filter).delete()
