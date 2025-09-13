import openai
from backend.config import Config
from backend.app.utils.database import ai_recommendations_collection
from bson import ObjectId

openai.api_key = Config.OPENAI_KEY

def get_recommendations(user_id):
    recommendations = ai_recommendations_collection.find({"user_id": user_id})
    return [{**rec, '_id': str(rec['_id'])} for rec in recommendations]

def generate_bio(form_data):
    prompt = f"Crie uma bio profissional para um empresário com as seguintes informações:\n"
    for key, value in form_data.items():
        prompt += f"- {key.replace('_', ' ').title()}: {value}\n"
    prompt += "A bio deve ser concisa, profissional e destacar os pontos fortes do empresário."

    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=150
        )
        return response.choices[0].text.strip()
    except Exception as e:
        print(f"Error generating bio: {e}")
        return None

def optimize_profile(user_id):
    # Placeholder for optimizing a user profile
    return {"message": "Profile optimization suggestions"}
