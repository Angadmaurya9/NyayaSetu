import unittest
import json
import os
import sys

# Ensure backend path is importable
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.app import app
from backend.agents.scheme_agent import scheme_agent
from backend.services.authority_service import authority_service
from backend.services.pdf_service import pdf_service

class TestNyayaSetuBackend(unittest.TestCase):
  def setUp(self):
    self.client = app.test_client()

  def test_health_endpoint(self):
    res = self.client.get('/api/health')
    self.assertEqual(res.status_code, 200)
    data = res.get_json()
    self.assertEqual(data.get('status'), 'online')

  def test_orchestrate_endpoint(self):
    res = self.client.post('/api/orchestrate', json={'query': 'I want to build an RTI request'})
    self.assertEqual(res.status_code, 200)
    data = res.get_json()
    self.assertEqual(data.get('intent'), 'rti')

  def test_scheme_eligibility_rule(self):
    # Eligible case
    data_eligible = scheme_agent.evaluate({"income": 150000, "category": "OBC", "state": "UP"})
    self.assertEqual(data_eligible['status'], 'eligible')

    # Ineligible case
    data_ineligible = scheme_agent.evaluate({"income": 350000, "category": "OBC", "state": "UP"})
    self.assertEqual(data_ineligible['status'], 'ineligible')

  def test_authority_lookup(self):
    authority = authority_service.match_authority("road construction pothole", "UP", "Varanasi")
    self.assertIn("Public Works Department", authority['name'])

  def test_pdf_generation(self):
    pdf_bytes = pdf_service.generate_rti_pdf({
      "applicantName": "Test Citizen",
      "district": "Delhi",
      "state": "Delhi",
      "points": ["Certified copies of road audit"]
    })
    self.assertTrue(len(pdf_bytes) > 0)
    self.assertTrue(pdf_bytes.startswith(b'%PDF'))

if __name__ == '__main__':
  unittest.main()
