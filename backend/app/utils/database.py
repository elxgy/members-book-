from pymongo import MongoClient
from config import Config

client = MongoClient(Config.MONGO_URI)
db = client.get_database("Cluster0-Members-book")

members_collection = db.get_collection("members")
messages_collection = db.get_collection("messages")
ai_recommendations_collection = db.get_collection("ai_recommendations")
forms_collection = db.get_collection("forms")
members_info_collection = db.get_collection("members_info")
validate_values_collection = db.get_collection("validate_values")
update_requests_collection = db.get_collection("update_requests")
value_requests_collection = db.get_collection("value_requests")