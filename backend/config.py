import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Configurações básicas
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'a-secret-key'
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET') or 'a-jwt-secret-key'
    
    # Configurações do banco de dados
    MONGO_URI = os.environ.get('MONGODB_URI')
    
    # Configurações de APIs externas
    OPENAI_KEY = os.environ.get('OPENAI_KEY')
    
    # Configurações do servidor
    SERVER_HOST = os.environ.get('SERVER_HOST') or '0.0.0.0'
    SERVER_PORT = int(os.environ.get('SERVER_PORT') or 5000)
    DEBUG = os.environ.get('DEBUG', 'True').lower() == 'true'
    
    # Configurações de CORS
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', '*').split(',')
    
    # Configurações de segurança
    JWT_ACCESS_TOKEN_EXPIRES = int(os.environ.get('JWT_ACCESS_TOKEN_EXPIRES') or 3600)  # 1 hora
    BCRYPT_LOG_ROUNDS = int(os.environ.get('BCRYPT_LOG_ROUNDS') or 12)
    
    # Configurações de rate limiting
    RATE_LIMIT_ENABLED = os.environ.get('RATE_LIMIT_ENABLED', 'True').lower() == 'true'
    RATE_LIMIT_DEFAULT = os.environ.get('RATE_LIMIT_DEFAULT') or '100 per hour'
    
    @classmethod
    def validate_config(cls):
        """Valida se as configurações obrigatórias estão definidas"""
        required_vars = ['MONGO_URI']
        missing_vars = []
        
        for var in required_vars:
            if not getattr(cls, var):
                missing_vars.append(var)
        
        if missing_vars:
            raise ValueError(f"Variáveis de ambiente obrigatórias não definidas: {', '.join(missing_vars)}")
        
        return True
