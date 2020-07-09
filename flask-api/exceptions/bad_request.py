"""
Miniburn API

Author: Vladimir Semenov
"""

from exceptions.exception_model import ExceptionModel

# pylint: disable=R0903
class IsJson(ExceptionModel):
    """
    Checks if request data is JSON
    """
    response = ("Bad Request", 400)

    @staticmethod
    def check(request):
        return request.is_json
