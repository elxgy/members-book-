import os
import sys
from flask.cli import FlaskGroup

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.app.main import app
from backend.seed import seed_users
from backend.config import Config

cli = FlaskGroup(create_app=lambda: app)

@cli.command("test")
def test():
    """Runs the tests."""
    import pytest
    rv = pytest.main(["backend/tests"])
    exit(rv)

@cli.command("seed")
def seed():
    """Seeds the database with initial data."""
    seed_users()

@cli.command("runserver")
def runserver():
    """Run the Flask development server."""
    config = Config()
    host = "0.0.0.0"
    port = config.SERVER_PORT
    debug = config.DEBUG
    
    print(f"\n=== Starting Flask Server via manage.py ===")
    print(f"Host: {host}")
    print(f"Port: {port}")
    print(f"Debug: {debug}")
    print(f"Server URL: http://{host}:{port}")
    print(f"==========================================\n")
    
    app.run(debug=debug, host=host, port=port)

if __name__ == "__main__":
    cli()