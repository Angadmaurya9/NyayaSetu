import os
import sys

# Ensure root directory is added to sys.path for serverless environment
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.app import app

# Vercel serverless function entry point
app = app
