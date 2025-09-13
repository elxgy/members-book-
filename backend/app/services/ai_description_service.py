import openai
from backend.config import Config
from backend.app.utils.database import members_info_collection, members_collection
from bson import ObjectId

openai.api_key = Config.OPENAI_KEY

def generate_description(user_id):
    member_info = members_info_collection.find_one({"user_id": user_id})
    if not member_info:
        return {"error": "Member info not found"}, 404

    system_prompt = (
        "Você é um assistente de IA especialista em criar biografias profissionais para empresários brasileiros."
        "Seu objetivo é criar uma bio concisa, profissional e que destaque os pontos fortes do empresário, seguindo o padrão solicitado."
    )

    user_prompt = (
        f"Crie uma bio profissional em português do Brasil para um empresário com as seguintes informações:\n"
        f"- Nome: {member_info.get('name')}\n"
        f"- Empresa: {member_info.get('company')}\n"
        f"- Setor: {member_info.get('sector')}\n"
        f"- Cargo: {member_info.get('hierarchy')}\n"
        f"- Título: {member_info.get('title')}\n"
        f"- Especialidades: {', '.join(member_info.get('expertise', []))}\n\n"
        f"A bio deve seguir o seguinte padrão:\n"
        f"1. **Quem sou eu:** Uma breve introdução sobre o profissional.\n"
        f"2. **O que eu faço:** Uma descrição sobre sua atuação profissional e sua empresa.\n"
        f"3. **O que eu busco:** O que o profissional busca na comunidade (parcerias, clientes, etc.).\n"
    )

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            max_tokens=250,
            temperature=0.7
        )
        description = response.choices[0].message['content'].strip()
        
        members_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"description": description}}
        )
        
        return {"message": "Description generated and updated successfully", "description": description}, 200
    except Exception as e:
        print(f"Error generating description: {e}")
        return {"error": "Failed to generate description"}, 500
