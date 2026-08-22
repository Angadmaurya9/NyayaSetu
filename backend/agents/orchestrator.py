import re
from backend.services.gemini_service import gemini_service
from backend.config.prompts import ORCHESTRATOR_SYSTEM_PROMPT

class OrchestratorAgent:
  def classify_intent(self, query: str) -> dict:
    q_lower = query.lower()
    
    # Extract details deterministically for fallback
    extracted = self._extract_fallback_details(query)

    # Gemini LLM classification
    res = gemini_service.generate_json_response(query, ORCHESTRATOR_SYSTEM_PROMPT)
    if res and "intent" in res:
      if "extracted" not in res:
        res["extracted"] = extracted
      return res

    # Deterministic rule fallback for standard queries
    if any(k in q_lower for k in ["rti", "information", "spent", "sanctioned", "road project", "budget"]):
      intent = "rti"
      summary = "Right to Information (RTI) Request"
    elif any(k in q_lower for k in ["scholarship", "eligible", "scheme", "kisan", "awas"]):
      intent = "scheme"
      summary = "Government Scheme Eligibility Check"
    elif any(k in q_lower for k in ["form", "fill", "income certificate", "application"]):
      intent = "form"
      summary = "Guided Form Filling Assistance"
    else:
      intent = "rights"
      summary = "Civic & Tenant Rights Analysis"

    missing_info = []
    if not extracted.get("location"):
      missing_info.append("State / Jurisdiction")

    return {
      "intent": intent,
      "confidence": "high",
      "summary": summary,
      "extracted": extracted,
      "missing_information": missing_info
    }

  def _extract_fallback_details(self, query: str) -> dict:
    # Amount extraction e.g. ₹15,000 or 15000 rupees
    amt_match = re.search(r'(?:₹|rs\.?|inr)\s*([\d,]+)|([\d,]+)\s*(?:rupees|rs|inr)', query, re.IGNORECASE)
    amount = f"₹{amt_match.group(1) or amt_match.group(2)}" if amt_match else ""

    # Duration extraction e.g. 2 months, 60 days, 3 weeks
    dur_match = re.search(r'(\d+\s*(?:month|months|day|days|week|weeks|year|years))', query, re.IGNORECASE)
    duration = dur_match.group(1) if dur_match else ""

    # Common location detection
    known_locations = [
      "Prayagraj", "Varanasi", "Lucknow", "Delhi", "Bengaluru", "Bangalore",
      "Mumbai", "Jaipur", "Patna", "Kolkata", "Chennai", "Hyderabad",
      "Uttar Pradesh", "Karnataka", "Maharashtra", "Bihar", "Rajasthan"
    ]
    loc_found = ""
    for loc in known_locations:
      if loc.lower() in query.lower():
        loc_found = loc
        break

    # Issue type inference
    q_lower = query.lower()
    if "landlord" in q_lower or "deposit" in q_lower or "rent" in q_lower:
      issue_type = "Tenant–Landlord Security Deposit Dispute"
    elif "road" in q_lower or "spent" in q_lower or "rti" in q_lower:
      issue_type = "Public Works & Fund Expenditure Query"
    elif "scholarship" in q_lower or "scheme" in q_lower:
      issue_type = "Welfare Scheme Qualification Check"
    elif "form" in q_lower or "certificate" in q_lower:
      issue_type = "Official Certificate / Form Intake"
    else:
      issue_type = "General Civic Issue"

    actions_taken = []
    if "contacted" in q_lower or "asked" in q_lower or "called" in q_lower or "wrote" in q_lower:
      actions_taken.append("Contacted authority / counterparty directly")

    return {
      "issue_type": issue_type,
      "location": loc_found,
      "amount": amount,
      "duration": duration,
      "actions_taken": actions_taken
    }

orchestrator = OrchestratorAgent()

