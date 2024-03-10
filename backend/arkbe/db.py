from pymongo.mongo_client import MongoClient

_CONNECTION_STRING = "<MONGODB_SRV_URL>"

_client = MongoClient(_CONNECTION_STRING)

try:
    _client.admin.command("ping")
except Exception as e:
    print(e)

db = _client["encodeai2024"]
