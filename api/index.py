import os
import sys
import traceback

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

try:
    from backend.app import app as flask_app
    
    def app(environ, start_response):
        try:
            return flask_app(environ, start_response)
        except Exception as e:
            tb = traceback.format_exc()
            start_response('500 Internal Server Error', [('Content-Type', 'text/plain; charset=utf-8')])
            return [f"WSGI Handler Error:\n{tb}".encode('utf-8')]

    handler = app
except Exception as import_err:
    import_tb = traceback.format_exc()
    def app(environ, start_response):
        start_response('500 Internal Server Error', [('Content-Type', 'text/plain; charset=utf-8')])
        return [f"Import Error in api/index.py:\n{import_tb}".encode('utf-8')]
    handler = app


