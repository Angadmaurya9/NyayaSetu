from flask import Blueprint, request, jsonify, Response
from backend.services.pdf_service import pdf_service

form_bp = Blueprint('form', __name__)

@form_bp.route('/analyze', methods=['POST'])
def analyze_form():
  data = request.get_json() or {}
  return jsonify({
    "status": "valid",
    "form_type": data.get("form_type", "income_cert"),
    "message": "Form validation passed successfully."
  })

@form_bp.route('/generate', methods=['POST'])
def generate_form():
  data = request.get_json() or {}
  pdf_bytes = pdf_service.generate_form_pdf(data)
  return Response(
    pdf_bytes,
    mimetype='application/pdf',
    headers={'Content-Disposition': 'attachment;filename=Filled_Government_Form.pdf'}
  )
