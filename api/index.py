import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS

app = Flask(__name__, static_folder=BASE_DIR)
CORS(app)

try:
    from backend.routes.rights_routes import rights_bp
    from backend.routes.rti_routes import rti_bp
    from backend.routes.scheme_routes import scheme_bp
    from backend.routes.form_routes import form_bp
    from backend.agents.orchestrator import orchestrator

    app.register_blueprint(rights_bp, url_prefix='/api/rights')
    app.register_blueprint(rti_bp, url_prefix='/api/rti')
    app.register_blueprint(scheme_bp, url_prefix='/api/scheme')
    app.register_blueprint(form_bp, url_prefix='/api/form')

    @app.route('/api/orchestrate', methods=['POST'])
    def orchestrate():
        data = request.get_json() or {}
        query = data.get('query', '')
        result = orchestrator.classify_intent(query)
        return jsonify(result)
except Exception as e:
    print("Blueprint registration error:", e)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "online", "app": "NyayaSetu", "version": "1.0.0"})

@app.route('/')
def index():
    if os.path.exists(os.path.join(BASE_DIR, 'index.html')):
        return send_from_directory(BASE_DIR, 'index.html')
    return "NyayaSetu Online", 200

@app.route('/<path:filename>')
def serve_static(filename):
    if os.path.exists(os.path.join(BASE_DIR, filename)):
        return send_from_directory(BASE_DIR, filename)
    return jsonify({"error": "Not found"}), 404



