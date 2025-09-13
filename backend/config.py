import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'a-secret-key'
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET') or 'a-jwt-secret-key'
    MONGO_URI = os.environ.get('MONGODB_URI')
