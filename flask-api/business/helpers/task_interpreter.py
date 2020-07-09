"""
Miniburn API

Author: Vladimir Semenov
"""

from bson import ObjectId

def get_id(data):
    """Convert string to ObjectId"""
    return ObjectId(data["_id"])
