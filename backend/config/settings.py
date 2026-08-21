import os

class Settings:
  GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
  PORT = int(os.getenv("PORT", 5000))
  CHROMA_PERSIST_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "chroma_db")
  DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")

settings = Settings()
