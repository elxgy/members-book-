#!/usr/bin/env python3
"""
Server startup script.
This script provides an easy way to start the Flask server.
"""

import os
import sys
import argparse

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.app.main import app
from backend.config import Config

def main():
    parser = argparse.ArgumentParser(description='Start the Flask server')
    parser.add_argument('--host', type=str, default='0.0.0.0', help='Host IP address')
    parser.add_argument('--port', type=int, help='Override port number')
    parser.add_argument('--debug', action='store_true', help='Enable debug mode')
    parser.add_argument('--no-debug', action='store_true', help='Disable debug mode')
    
    args = parser.parse_args()
    
    config = Config()
    
    host = args.host
    port = args.port if args.port else 5002
    
    if args.debug:
        debug = True
    elif args.no_debug:
        debug = False
    else:
        debug = False
    
    print(f"\n=== Starting Flask Server ===")
    print(f"Host: {host}")
    print(f"Port: {port}")
    print(f"Debug: {debug}")
    print(f"Server URL: http://{host}:{port}")
    print(f"================================\n")
    
    try:
        app.run(debug=debug, host=host, port=port)
    except KeyboardInterrupt:
        print("\n\nServer stopped by user.")
    except Exception as e:
        print(f"\nError starting server: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()