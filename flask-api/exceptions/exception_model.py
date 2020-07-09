"""
Miniburn API

Author: Vladimir Semenov
"""

# pylint: disable=R0903
class ExceptionModel:
    """
    Base class for exceptions
    """
    response = ()

    @staticmethod
    def check(request):
        """Check request"""
        return request
