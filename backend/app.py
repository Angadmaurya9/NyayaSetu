import os
from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

import sys
# Load environment variables
load_dotenv()

# Set up paths relative to project root
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIR = os.path.join(BASE_DIR, 'frontend')
if not os.path.exists(FRONTEND_DIR):
  FRONTEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend'))

if BASE_DIR not in sys.path:
  sys.path.insert(0, BASE_DIR)

app = Flask(__name__, static_folder=FRONTEND_DIR)
CORS(app)

from backend.routes.rights_routes import rights_bp

from backend.routes.rti_routes import rti_bp
from backend.routes.scheme_routes import scheme_bp
from backend.routes.form_routes import form_bp
from backend.agents.orchestrator import orchestrator
from flask import request

# Register Blueprints
app.register_blueprint(rights_bp, url_prefix='/api/rights')
app.register_blueprint(rti_bp, url_prefix='/api/rti')
app.register_blueprint(scheme_bp, url_prefix='/api/scheme')
app.register_blueprint(form_bp, url_prefix='/api/form')

# Serve Homepage
@app.route('/')
def index():
  return send_from_directory(FRONTEND_DIR, 'index.html')

# Direct Page Route Aliases
@app.route('/rights')
def route_rights():
  return send_from_directory(os.path.join(FRONTEND_DIR, 'pages'), 'rights.html')

@app.route('/rti')
def route_rti():
  return send_from_directory(os.path.join(FRONTEND_DIR, 'pages'), 'rti.html')

@app.route('/schemes')
def route_schemes():
  return send_from_directory(os.path.join(FRONTEND_DIR, 'pages'), 'schemes.html')

@app.route('/forms')
def route_forms():
  return send_from_directory(os.path.join(FRONTEND_DIR, 'pages'), 'forms.html')

# Serve Feature Pages
@app.route('/pages/<path:filename>')
def serve_pages(filename):
  return send_from_directory(os.path.join(FRONTEND_DIR, 'pages'), filename)

# Serve CSS, JS, and Assets
@app.route('/css/<path:filename>')
def serve_css(filename):
  return send_from_directory(os.path.join(FRONTEND_DIR, 'css'), filename)

@app.route('/js/<path:filename>')
def serve_js(filename):
  return send_from_directory(os.path.join(FRONTEND_DIR, 'js'), filename)

@app.route('/assets/<path:filename>')
def serve_assets(filename):
  assets_dir = os.path.join(FRONTEND_DIR, 'assets')
  if not os.path.exists(assets_dir):
    os.makedirs(assets_dir, exist_ok=True)
  return send_from_directory(assets_dir, filename)

@app.route('/favicon.ico')
def favicon():
  return ('', 204)


# Orchestrator API endpoint
@app.route('/api/orchestrate', methods=['POST'])
def orchestrate():
  data = request.get_json() or {}
  query = data.get('query', '')
  result = orchestrator.classify_intent(query)
  return jsonify(result)

# Health check API endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
  return jsonify({
    "status": "online",
    "app": "NyayaSetu",
    "version": "1.0.0"
  })

if __name__ == '__main__':
  port = int(os.environ.get('PORT', 5000))
  print(f"Starting NyayaSetu server at http://127.0.0.1:{port}")
  app.run(host='0.0.0.0', port=port, debug=True)

