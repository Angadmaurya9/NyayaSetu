from flask import Blueprint, request, jsonify
from backend.agents.rights_agent import rights_agent

rights_bp = Blueprint('rights', __name__)

@rights_bp.route('/analyze', methods=['POST'])
def analyze_rights():
  data = request.get_json() or {}
  result = rights_agent.analyze(data)
  return jsonify(result)
