import os
import json
import re

class GeminiService:
  @property
  def api_key(self):
    return os.getenv("GEMINI_API_KEY", "")

  def generate_json_response(self, prompt: str, system_instruction: str = "") -> dict:
    """
    Safely call Gemini API server-side using HTTP REST or SDK.
    Never exposes API key to client.
    """
    key = self.api_key
    if not key or key == "your_gemini_api_key_here":
      print("GeminiService: No API key set, returning fallback.")
      return {"status": "mock", "message": "Gemini API key not configured."}

    try:
      import requests
      url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={key}"
      
      headers = {"Content-Type": "application/json"}
      payload = {
        "contents": [{"parts": [{"text": f"{system_instruction}\n\nUser Query: {prompt}"}]}],
        "generationConfig": {"response_mime_type": "application/json"}
      }

      res = requests.post(url, headers=headers, json=payload, timeout=12)
      if res.status_code == 200:
        data = res.json()
        raw_text = data['candidates'][0]['content']['parts'][0]['text']
        cleaned_text = raw_text.strip()
        if cleaned_text.startswith("```"):
          cleaned_text = re.sub(r'^```(?:json)?\s*', '', cleaned_text)
          cleaned_text = re.sub(r'\s*```$', '', cleaned_text)
        return json.loads(cleaned_text)
      else:
        print(f"Gemini API HTTP Error {res.status_code}: {res.text}")
        return {}
    except Exception as e:
      print(f"Gemini API call failed: {e}")
      return {}

gemini_service = GeminiService()
