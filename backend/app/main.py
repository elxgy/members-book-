from flask import Flask
from backend.app.routes.auth import auth_bp
from backend.app.routes.members import members_bp
from backend.app.routes.messages import messages_bp
from backend.app.routes.ai import ai_bp
from backend.app.routes.admin import admin_bp
from backend.app.routes.forms import forms_bp
from backend.config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(members_bp, url_prefix='/api/members')
app.register_blueprint(messages_bp, url_prefix='/api/messages')
app.register_blueprint(ai_bp, url_prefix='/api/ai')
app.register_blueprint(admin_bp, url_prefix='/api/admin')
app.register_blueprint(forms_bp, url_prefix='/api/admin/forms')

if __name__ == '__main__':
    app.run(debug=True)
