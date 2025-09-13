import os
import sys
from flask.cli import FlaskGroup

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.app.main import app
from backend.seed import seed_users

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

if __name__ == "__main__":
    cli()