from flask import Flask, jsonify, request
from backend.app.routes.auth import auth_bp
from backend.app.routes.members import members_bp
from backend.app.routes.messages import messages_bp
from backend.app.routes.ai import ai_bp
from backend.app.routes.admin import admin_bp
from backend.app.routes.forms import forms_bp
from backend.app.routes.deals import deals_bp
from backend.app.routes.value_requests import value_requests_bp
from backend.config import Config
from flask_cors import CORS
import logging
from datetime import datetime

# Configurar logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Validar configurações
    try:
        Config.validate_config()
        logger.info("Configurações validadas com sucesso")
    except ValueError as e:
        logger.error(f"Erro na configuração: {e}")
        raise
    
    # Configurar CORS com mais segurança
    CORS(app, 
         origins=Config.CORS_ORIGINS,
         methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
         allow_headers=['Content-Type', 'Authorization'],
         supports_credentials=True
    )
    
    # Middleware de segurança
    @app.before_request
    def security_headers():
        # Log da requisição
        logger.info(f"{request.method} {request.path} - {request.remote_addr}")
    
    @app.after_request
    def after_request(response):
        # Headers de segurança
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        return response
    
    # Handler de erro global
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Endpoint não encontrado'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        logger.error(f"Erro interno: {error}")
        return jsonify({'error': 'Erro interno do servidor'}), 500
    
    # Health check endpoint
    @app.route('/health')
    def health_check():
        return jsonify({
            'status': 'healthy',
            'timestamp': datetime.utcnow().isoformat(),
            'version': '1.0.0'
        })
    
    return app

app = create_app()

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(members_bp, url_prefix='/api/members')
app.register_blueprint(messages_bp, url_prefix='/api/messages')
app.register_blueprint(ai_bp, url_prefix='/api/ai')
app.register_blueprint(admin_bp, url_prefix='/api/admin')
app.register_blueprint(forms_bp, url_prefix='/api/admin/forms')
app.register_blueprint(deals_bp, url_prefix='/api/deals')
app.register_blueprint(value_requests_bp, url_prefix='/api/value-requests')

if __name__ == '__main__':
    app.run(debug=True)


