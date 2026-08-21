"""
Public Authority & Department Matching Service for RTI Applications
"""

AUTHORITIES_DATA = [
  {
    "keywords": ["road", "highway", "bridge", "pavement", "construction", "pothole", "pwd"],
    "department": "Public Works Department (PWD)",
    "public_authority": "Office of the Executive Engineer, PWD",
    "section": "Public Works & Infrastructure Division"
  },
  {
    "keywords": ["panchayat", "village", "rural", "mnrega", "block", "sarpanch", "sanitation"],
    "department": "Department of Rural Development & Panchayati Raj",
    "public_authority": "Office of the Block Development Officer (BDO)",
    "section": "Rural Development & Welfare Division"
  },
  {
    "keywords": ["school", "education", "teacher", "scholarship", "midday meal", "college"],
    "department": "Department of School Education & Literacy",
    "public_authority": "Office of the District Basic Education Officer (BSAO)",
    "section": "Education & Student Welfare"
  },
  {
    "keywords": ["rent", "landlord", "tenant", "housing", "flat", "security deposit"],
    "department": "Rent Authority / Housing & Urban Development Department",
    "public_authority": "Office of the Rent Controller / District Magistrate",
    "section": "Urban Housing & Tenancy Division"
  },
  {
    "keywords": ["ration", "pds", "food", "consumer", "adulteration", "refund"],
    "department": "Department of Food, Civil Supplies & Consumer Affairs",
    "public_authority": "Office of the District Supply Officer (DSO)",
    "section": "Consumer Protection & PDS Division"
  }
]

class AuthorityService:
  @staticmethod
  def match_authority(query: str, state: str = "", district: str = "") -> dict:
    q_lower = query.lower()
    
    for item in AUTHORITIES_DATA:
      if any(kw in q_lower for kw in item["keywords"]):
        dept_name = f"{item['department']} ({district + ', ' if district else ''}{state})"
        return {
          "name": dept_name,
          "public_authority": item["public_authority"],
          "section": item["section"]
        }
        
    return {
      "name": f"General Administration Department ({district + ', ' if district else ''}{state})",
      "public_authority": "Office of the District Magistrate / Collectorate",
      "section": "General Civic Services"
    }

authority_service = AuthorityService()
