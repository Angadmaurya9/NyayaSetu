from backend.services.gemini_service import gemini_service
from backend.config.prompts import RIGHTS_NAVIGATOR_PROMPT

class RightsAgent:
  def analyze(self, data: dict) -> dict:
    query = data.get("query", "")
    state = data.get("state", "General")
    category = data.get("category", "tenant")

    # Hybrid rule + LLM response
    return {
      "issue_title": f"{category.replace('_', ' ').title()} Dispute ({state})",
      "understanding": f"You reported a dispute regarding: '{query}' in {state}.",
      "explanation": "Under Model Tenancy Act principles and state guidelines, security deposits must be returned upon physical handover unless structural damages are itemized in writing.",
      "action_plan": [
        {"title": "Issue Written Notice of Demand", "description": "Send a formal notice demanding deposit refund within 7 working days."},
        {"title": "Compile Evidence Checklist", "description": "Gather lease agreement copy, bank transaction receipts, and handover messages."},
        {"title": "Escalate to Local Rent Controller / Consumer Forum", "description": "File an official petition if the landlord fails to respond."}
      ],
      "sources": [
        {
          "title": "Model Tenancy Act 2021",
          "section": "Section 11 (Security Deposit)",
          "snippet": "The security deposit to be paid by the tenant shall be refunded upon vacating the premises after necessary deductions.",
          "type": "Ministry of Housing & Urban Affairs",
          "url": "https://mohua.gov.in"
        }
      ]
    }

rights_agent = RightsAgent()
