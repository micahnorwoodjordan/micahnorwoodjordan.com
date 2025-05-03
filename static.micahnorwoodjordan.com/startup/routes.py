from flask import Blueprint, send_from_directory, abort

from environment.environment import STATIC_DIR


main = Blueprint('main', __name__)


@main.route('/ping')
def ping():
    return 'PONG'


@main.route('/<path:filename>')
def serve_static(filename):
    try:
        return send_from_directory(STATIC_DIR, filename)
    except FileNotFoundError:
        abort(404)
    except Exception as e:
        print(f'there was an error: {e}')
        abort(404)


@main.route('/favicon.ico')
def favicon():
    return '', 204  # No content
