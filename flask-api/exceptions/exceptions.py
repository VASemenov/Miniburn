"""
Miniburn API

Author: Vladimir Semenov
"""

from exceptions.bad_request import IsJson

exception_handlers = [
    IsJson
]

def handle_exceptions(request):
    """Go trough all specified exceptions and check
    if they are not firing"""
    result = None
    for exception_handler in exception_handlers:
        if not exception_handler.check(request):
            result = exception_handler.response

    return result
