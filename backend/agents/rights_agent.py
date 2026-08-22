from backend.services.gemini_service import gemini_service
from backend.config.prompts import RIGHTS_NAVIGATOR_PROMPT

class RightsAgent:
  def analyze(self, data: dict) -> dict:
    query = data.get("query", "")
    state = data.get("state", "General")
    category = data.get("category", "tenant")

    # 1. Try Live Gemini API call if key is available
    prompt_str = f"User Situation: {query}\nLocation/State: {state}\nSelected Category: {category}"
    res = gemini_service.generate_json_response(prompt_str, RIGHTS_NAVIGATOR_PROMPT)
    
    if res and isinstance(res, dict) and "issue_title" in res and "action_plan" in res:
      return res

    # 2. Dynamic Query-Aware Fallback when API key is missing or offline
    q_lower = query.lower()

    if any(k in q_lower for k in ["product", "defective", "refund", "seller", "consumer", "flipkart", "amazon", "shop"]):
      return {
        "issue_title": f"Consumer Product / Service Dispute ({state})",
        "understanding": f"You reported an issue regarding defective products or unfulfilled service: '{query}'.",
        "explanation": f"Under the Consumer Protection Act 2019, consumers in {state} have the right to seek replacement, full refund, or compensation for defective goods or deficiency in services.",
        "action_plan": [
          {"title": "01 Preserved Proof of Purchase & Written Communication", "description": "Gather order invoice, payment receipts, warranty card, and seller emails."},
          {"title": "02 Send Formal Legal Demand Notice to Seller / Manufacturer", "description": "Issue a written demand notice giving 15 days for full resolution or refund."},
          {"title": "03 Register Complaint on National Consumer Helpline (NCH)", "description": "File an official complaint at consumerhelpline.gov.in or National Consumer Disputes Redressal Commission (NCDRC)."}
        ],
        "sources": [
          {
            "title": "Consumer Protection Act 2019",
            "section": "Section 2(11) - Deficiency in Service & Product Liability",
            "snippet": "Deficiency means any fault, imperfection, shortcoming or inadequacy in the quality, nature and manner of performance.",
            "type": "Ministry of Consumer Affairs",
            "url": "https://consumerhelpline.gov.in"
          }
        ]
      }
    elif any(k in q_lower for k in ["exam", "university", "back", "marksheet", "re-evaluation", "college", "degree", "result", "fail", "recheck"]):
      return {
        "issue_title": f"University Academic Back / Re-evaluation Guidance ({state})",
        "understanding": f"You reported an academic back paper / exam issue: '{query}'.",
        "explanation": f"Under University Grants Commission (UGC) Guidelines and university ordinances in {state}, students have the right to apply for answer-sheet scrutiny, re-evaluation, or special back paper examinations within specified academic schedules.",
        "action_plan": [
          {"title": "01 Apply for Answer Sheet Scrutiny / Re-evaluation", "description": "Submit the formal re-evaluation / scrutiny application via your university student portal within prescribed deadline (usually 15 days of result declaration)."},
          {"title": "02 Register for Back Paper / Supplementary Examination", "description": "Check your university exam controller notification for the upcoming supplementary or odd/even semester back paper registration window."},
          {"title": "03 Request Answer Booklet Certified Copy under RTI Act 2005", "description": "If marks are missing or unfairly evaluated, file an RTI application with the University PIO requesting a certified copy of your evaluated answer booklet (Supreme Court precedent in CBSE v. Aditya Bandopadhyay)."}
        ],
        "sources": [
          {
            "title": "UGC Student Grievance Redressal Regulations & Supreme Court Ruling",
            "section": "Answer Booklet Inspection Right (CBSE v. Aditya Bandopadhyay 2011)",
            "snippet": "Evaluating authorities are public authorities under RTI Act; students have the statutory right to inspect and obtain copies of evaluated answer scripts.",
            "type": "University Grants Commission (UGC)",
            "url": "https://www.ugc.gov.in"
          }
        ]
      }
    elif any(k in q_lower for k in ["water", "electricity", "bill", "power", "meter", "drainage", "garbage", "road"]):
      return {
        "issue_title": f"Public Utility & Civic Services Grievance ({state})",
        "understanding": f"You reported a civic or utility service issue: '{query}' in {state}.",
        "explanation": f"Under state municipal and electricity standards in {state}, public utilities are legally required to maintain uninterrupted service and resolve billing or supply grievances within prescribed statutory timelines.",
        "action_plan": [
          {"title": "01 Document Grievance with Reference Numbers", "description": "Collect utility bill numbers, complaint tokens, and photographic evidence."},
          {"title": "02 Submit Escalation to Executive Engineer / Municipal Commissioner", "description": "File a formal written complaint with the departmental grievance officer."},
          {"title": "03 Escalate to State Electricity Regulatory Commission / Public Portal", "description": "Submit a petition via your state's CPGRAMS / Public Grievances portal."}
        ],
        "sources": [
          {
            "title": "Electricity Supply Code & Civic Service Standards",
            "section": "Standard of Performance Rules",
            "snippet": "Distribution licensees are obligated to restore supply and correct billing errors within mandatory SLA timeframes.",
            "type": "State Electricity Regulatory Commission",
            "url": "https://powermin.gov.in"
          }
        ]
      }
    else:
      # General / Tenant Fallback
      return {
        "issue_title": f"{category.replace('_', ' ').title()} Guidance ({state})",
        "understanding": f"You reported an issue: '{query}' in {state}.",
        "explanation": f"Under statutory rules applicable in {state}, parties must adhere to contractual terms and statutory guidelines regarding deposits, notices, and fair practices.",
        "action_plan": [
          {"title": "01 Compile Documented Evidence & Receipts", "description": "Gather relevant contracts, bank statements, messages, and official receipts."},
          {"title": "02 Send Formal Written Demand Notice", "description": "Issue a formal written notice detailing your request and specifying a 7-day deadline."},
          {"title": "03 Escalate to Designated Statutory Authority", "description": "File an official petition or complaint with your local district authority or tribunal."}
        ],
        "sources": [
          {
            "title": "Model Tenancy & Civic Rules Framework",
            "section": "Statutory Standards",
            "snippet": "Citizens are entitled to clear recourse and statutory dispute resolution mechanisms.",
            "type": "Ministry of Housing & Urban Affairs",
            "url": "https://mohua.gov.in"
          }
        ]
      }

rights_agent = RightsAgent()
