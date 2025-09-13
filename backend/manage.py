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

if __name__ == "__main__":
    cli()
