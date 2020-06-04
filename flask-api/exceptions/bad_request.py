from exceptions.exception_model import Exception


class IsJson(Exception):
  response = ("Bad Request", 400)

  @staticmethod
  def check(request):
    return request.is_json
