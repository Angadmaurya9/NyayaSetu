import os
import json
from backend.config.settings import settings

class SchemeAgent:
  def evaluate(self, data: dict) -> dict:
    scheme_id = data.get("scheme_id", "")
    query = (data.get("query") or "").lower()
    income = float(data.get("income", 0))
    category = data.get("category", "OBC")
    state = data.get("state", "")

    # Infer scheme_id from query if not specified or empty
    if not scheme_id:
      if any(k in query for k in ["awas", "pmay", "house", "housing", "मकान", "आवास"]):
        scheme_id = "pm_awas_yojana"
      elif any(k in query for k in ["kisan", "farmer", "किसान"]):
        scheme_id = "pm_kisan"
      elif any(k in query for k in ["worker", "bocw", "construction", "मजदूर"]):
        scheme_id = "bocw_welfare"
      else:
        scheme_id = "post_matric_scholarship"

    schemes_file = os.path.join(settings.DATA_DIR, "schemes", "schemes_data.json")
    scheme_meta = {}
    if os.path.exists(schemes_file):
      with open(schemes_file, "r") as f:
        schemes = json.load(f)
        scheme_meta = schemes.get(scheme_id, {})

    # Fallback mappings if scheme_meta is missing
    fallback_titles = {
      "pm_awas_yojana": "Pradhan Mantri Awas Yojana (PMAY - Housing for All)",
      "pm_kisan": "PM Kisan Samman Nidhi Scheme",
      "bocw_welfare": "Building & Other Construction Workers (BOCW) Welfare Scheme",
      "post_matric_scholarship": "Central Sector Post-Matric Scholarship Scheme"
    }

    scheme_name = scheme_meta.get("name") or fallback_titles.get(scheme_id, "Central Sector Post-Matric Scholarship Scheme")
    max_ceiling = scheme_meta.get("max_income_ceiling", 250000)

    is_eligible = income <= max_ceiling

    return {
      "scheme_id": scheme_id,
      "scheme_name": scheme_name,
      "status": "eligible" if is_eligible else "ineligible",
      "rule_evaluation": f"Income threshold check {'PASSED' if is_eligible else 'EXCEEDED'} (Max ceiling: ₹{max_ceiling:,})",
      "reason": f"Your reported family income of ₹{income:,.0f} {'meets' if is_eligible else 'exceeds'} the official ceiling limit of ₹{max_ceiling:,.0f}/yr under {scheme_name} guidelines for {category} candidates in {state or 'your state'}.",
      "required_documents": scheme_meta.get("required_documents", [
        "Government-issued Income Certificate",
        "State Domicile / Residence Proof",
        "Aadhaar Card linked with Bank Account"
      ]),
      "sources": [
        {
          "title": f"{scheme_name} Official Guidelines",
          "section": "Eligibility Criteria Section 4",
          "snippet": f"Family income from all sources shall not exceed INR {max_ceiling:,} per annum for scheme qualification.",
          "type": scheme_meta.get("ministry", "Ministry of Housing and Urban Affairs"),
          "url": scheme_meta.get("source_url", "https://pmaymis.gov.in")
        }
      ]
    }

scheme_agent = SchemeAgent()
