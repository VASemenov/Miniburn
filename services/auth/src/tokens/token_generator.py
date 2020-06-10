import hmac
import os
import hashlib
import base64
from dotenv import load_dotenv
import json
load_dotenv()

SECRET_KEY = str(hashlib.sha256(bytes(os.getenv("SHADOW"), encoding="latin-1")).hexdigest())
SECRET_KEY_BYTES = bytes(SECRET_KEY, encoding="latin-1")

print(SECRET_KEY)
print(type(SECRET_KEY))

def generate_token(header, payload, password):
  header64 = base64.b64encode(bytes(json.dumps(header), encoding="latin-1"))
  payload64 = base64.b64encode(bytes(json.dumps(payload), encoding="latin-1"))
  message_bytes = bytes(str(header64) + "." + str(payload64) + "." + password, encoding="latin-1")
  token = str(header64) + "." + str(payload64) + "." + str(hmac.new(SECRET_KEY_BYTES, message_bytes, hashlib.sha256).hexdigest())
  return token

print(
  generate_token(
  {
    "typ": "JWT",
    "alg": "HS256"
  },
  {
    "iss": "Codex Team",
    "sub": "auth",
    "exp": 1505467756869,
    "iat": 1505467152069,
    "user": "User"
  },
  "Password"
))
