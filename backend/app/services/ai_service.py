import openai
from backend.config import Config
from backend.app.utils.database import ai_recommendations_collection

openai.api_key = Config.OPENAI_KEY

def get_recommendations(user_id):
    recommendations = ai_recommendations_collection.find({"user_id": user_id})
    return [{**rec, '_id': str(rec['_id'])} for rec in recommendations]



def optimize_profile(user_id):
    # Placeholder for optimizing a user profile
    return {"message": "Profile optimization suggestions"}
