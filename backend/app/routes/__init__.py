from flask import Blueprint

# Criação do blueprint para rotas
bp = Blueprint('app', __name__)

# Importa as rotas para registrar no blueprint
from . import members  # Supondo que exista um arquivo members.py com rotas

def init_app(app):
    app.register_blueprint(bp)
    # Se precisar integração com o ambiente Expo, adicione aqui a inicialização ou configuração necessária.
    # Por exemplo, se for necessário configurar CORS para o Expo:
    # from flask_cors import CORS
    # CORS(app)