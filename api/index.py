import os
import sys
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "online", "app": "NyayaSetu", "version": "1.0.0"})

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    target = os.path.join(BASE_DIR, path) if path else os.path.join(BASE_DIR, 'index.html')
    if os.path.exists(target) and not os.path.isdir(target):
        return send_from_directory(os.path.dirname(target), os.path.basename(target))
    return jsonify({"status": "online", "app": "NyayaSetu", "path": path})




