from flask import Blueprint, request, jsonify
from backend.agents.scheme_agent import scheme_agent

scheme_bp = Blueprint('scheme', __name__)

@scheme_bp.route('/check', methods=['POST'])
def check_scheme():
  data = request.get_json() or {}
  result = scheme_agent.evaluate(data)
  return jsonify(result)
