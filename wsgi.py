import os
import sys

# Ensure project root directory is in sys.path for backend package imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from backend.app import app

# WSGI entry point for Vercel / Production deployment
if __name__ == '__main__':
    app.run()
