from flask import Blueprint, request, jsonify, Response
from backend.agents.rti_agent import rti_agent
from backend.services.pdf_service import pdf_service

rti_bp = Blueprint('rti', __name__)

@rti_bp.route('/analyze', methods=['POST'])
def analyze_rti():
  data = request.get_json() or {}
  result = rti_agent.analyze(data)
  return jsonify(result)

@rti_bp.route('/generate', methods=['POST'])
def generate_rti():
  data = request.get_json() or {}
  pdf_bytes = pdf_service.generate_rti_pdf(data)
  return Response(
    pdf_bytes,
    mimetype='application/pdf',
    headers={'Content-Disposition': 'attachment;filename=RTI_Application.pdf'}
  )
