from backend.services.gemini_service import gemini_service
from backend.config.prompts import ORCHESTRATOR_SYSTEM_PROMPT

class OrchestratorAgent:
  def classify_intent(self, query: str) -> dict:
    q_lower = query.lower()
    
    # Deterministic rule fallback for standard demo queries
    if any(k in q_lower for k in ["rti", "information", "spent", "sanctioned", "road project", "budget"]):
      return {"intent": "rti", "confidence": "high", "summary": "Right to Information Request"}
    elif any(k in q_lower for k in ["scholarship", "eligible", "scheme", "kisan", "awas"]):
      return {"intent": "scheme", "confidence": "high", "summary": "Government Scheme Eligibility Check"}
    elif any(k in q_lower for k in ["form", "fill", "income certificate", "application"]):
      return {"intent": "form", "confidence": "high", "summary": "Guided Form Filling Assistance"}
    elif any(k in q_lower for k in ["landlord", "deposit", "rent", "consumer", "refund"]):
      return {"intent": "rights", "confidence": "high", "summary": "Civic & Tenant Rights Analysis"}

    # Gemini LLM classification
    res = gemini_service.generate_json_response(query, ORCHESTRATOR_SYSTEM_PROMPT)
    if res and "intent" in res:
      return res

    return {"intent": "rights", "confidence": "medium", "summary": "General Civic Guidance"}

orchestrator = OrchestratorAgent()
