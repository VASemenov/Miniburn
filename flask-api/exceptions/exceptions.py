from exceptions.bad_request import *

exception_handlers = [
  IsJson
]

def handle_exceptions(request):
  for exception_handler in exception_handlers:
    if not exception_handler.check(request):
      return exception_handler.response

  return
