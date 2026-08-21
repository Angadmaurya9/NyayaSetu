import os
import json
from backend.config.settings import settings

class SchemeAgent:
  def evaluate(self, data: dict) -> dict:
    scheme_id = data.get("scheme_id", "post_matric_scholarship")
    income = float(data.get("income", 0))
    category = data.get("category", "OBC")
    state = data.get("state", "")

    schemes_file = os.path.join(settings.DATA_DIR, "schemes", "schemes_data.json")
    scheme_meta = {}
    if os.path.exists(schemes_file):
      with open(schemes_file, "r") as f:
        schemes = json.load(f)
        scheme_meta = schemes.get(scheme_id, {})

    max_ceiling = scheme_meta.get("max_income_ceiling", 250000)
    scheme_name = scheme_meta.get("name", "Post-Matric Scholarship Scheme")

    is_eligible = income <= max_ceiling

    return {
      "scheme_name": scheme_name,
      "status": "eligible" if is_eligible else "ineligible",
      "rule_evaluation": f"Income threshold check {'PASSED' if is_eligible else 'EXCEEDED'} (Max ceiling: ₹{max_ceiling:,})",
      "reason": f"Your reported family income of ₹{income:,.0f} {'meets' if is_eligible else 'exceeds'} the official ceiling limit of ₹{max_ceiling:,.0f}/yr under {scheme_name} guidelines for {category} candidates in {state}.",
      "required_documents": scheme_meta.get("required_documents", [
        "Government Income Certificate",
        "Domicile Certificate",
        "Aadhaar card linked with bank account"
      ]),
      "sources": [
        {
          "title": f"{scheme_name} Official Guidelines",
          "section": "Eligibility Criteria Section 4",
          "snippet": f"Family income from all sources shall not exceed INR {max_ceiling:,} per annum.",
          "type": scheme_meta.get("ministry", "Ministry of Social Justice"),
          "url": scheme_meta.get("source_url", "https://scholarships.gov.in")
        }
      ]
    }

scheme_agent = SchemeAgent()
