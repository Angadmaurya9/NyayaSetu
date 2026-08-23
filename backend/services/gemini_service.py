import os
import json
import re

class GeminiService:
  @property
  def api_key(self):
    return os.getenv("GEMINI_API_KEY", "")

  def generate_json_response(self, prompt: str, system_instruction: str = "") -> dict:
    """
    Safely call Gemini API server-side using HTTP REST API.
    Cycles through available model versions (gemini-3.6-flash, gemini-2.5-flash, etc.) for high availability.
    """
    key = self.api_key
    if not key or key == "your_gemini_api_key_here":
      print("GeminiService: No API key set, returning fallback.")
      return {}

    candidate_models = [
      "gemini-3.6-flash",
      "gemini-2.5-flash",
      "gemini-flash-latest",
      "gemini-1.5-flash"
    ]

    import requests

    for model in candidate_models:
      try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}"
        headers = {"Content-Type": "application/json"}
        
        full_text = f"{system_instruction}\n\nUser Query: {prompt}" if system_instruction else prompt
        payload = {
          "contents": [{"parts": [{"text": full_text}]}],
          "generationConfig": {"response_mime_type": "application/json"}
        }

        res = requests.post(url, headers=headers, json=payload, timeout=12)
        if res.status_code == 200:
          data = res.json()
          candidates = data.get('candidates', [])
          if candidates and 'content' in candidates[0] and 'parts' in candidates[0]['content']:
            raw_text = candidates[0]['content']['parts'][0]['text']
            cleaned_text = raw_text.strip()
            if cleaned_text.startswith("```"):
              cleaned_text = re.sub(r'^```(?:json)?\s*', '', cleaned_text)
              cleaned_text = re.sub(r'\s*```$', '', cleaned_text)
            parsed = json.loads(cleaned_text)
            if isinstance(parsed, dict):
              return parsed
        else:
          print(f"Gemini API ({model}) HTTP {res.status_code}: {res.text[:200]}")
      except Exception as e:
        print(f"Gemini API ({model}) call failed: {e}")

    return {}

gemini_service = GeminiService()
