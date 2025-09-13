from pymongo import MongoClient
from backend.config import Config

client = MongoClient(Config.MONGO_URI)
db = client.members_book
