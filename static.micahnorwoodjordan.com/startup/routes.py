from flask_cors import cross_origin

from flask import Blueprint, send_from_directory, abort

from environment.environment import STATIC_DIR


main = Blueprint('main', __name__)


@main.route('/ping')
def ping():
    return 'PONG'


@cross_origin(origins=['https://micahnorwoodjordan.com', '192.168.0.136'])
@main.route('/<path:filename>')
def serve_static(filename):
    try:
        print(f'trying file: {filename}')
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
