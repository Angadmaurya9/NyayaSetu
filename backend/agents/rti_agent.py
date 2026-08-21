from backend.services.authority_service import authority_service

class RTIAgent:
  def analyze(self, data: dict) -> dict:
    query = data.get("query", "")
    state = data.get("state", "")
    district = data.get("district", "")
    year = data.get("year", "2023-24")

    authority = authority_service.match_authority(query, state, district)

    return {
      "authority": authority,
      "points": [
        f"Certified copies of the administrative sanction order and financial expenditure statement for the project described: '{query}'.",
        f"Copy of the tender award notice, contractor agreement, and completion certificate for period {year}.",
        "Names, designations, and office contacts of inspecting officers who certified the work."
      ]
    }

rti_agent = RTIAgent()
