import os
from flask.cli import FlaskGroup
from backend.app.main import app

cli = FlaskGroup(app)

@cli.command("test")
def test():
    """Runs the tests."""
    import pytest
    rv = pytest.main(["backend/tests"])
    exit(rv)

@cli.command("seed")
def seed():
    """Seeds the database with initial data."""
    from backend.seed import seed_users
    seed_users()

if __name__ == "__main__":
    cli()
