from flask import Blueprint, send_from_directory, abort, request

from environment.environment import STATIC_DIR


main = Blueprint('main', __name__)


@main.route('/ping')
def ping():
    return 'PONG'


@main.route('/<path:filename>', methods=['GET', 'OPTIONS'])
def serve_static(filename):
    if request.method == "OPTIONS":
        return '', 200
    try:
        print(f'trying file: {filename}')
        if filename.endswith('.ttc'):
            return send_from_directory(STATIC_DIR, filename, mimetype='font/ttc')
        else:
            return send_from_directory(STATIC_DIR, filename)
    except FileNotFoundError:
        print(f'filename not found: {filename}')
        abort(404)
    except Exception as e:
        print(f'there was an error: {e}')
        abort(404)


@main.route('/favicon.ico')
def favicon():
    return '', 204  # No content
