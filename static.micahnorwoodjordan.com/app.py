import os

from flask import Flask, send_from_directory, abort


ENV = os.environ
STATIC_DIR = os.path.abspath("files")  # TODO: update


app = Flask(__name__)


def is_production_mode(mode: str) -> bool:
    if 'true' in mode.lower():
        return True
    elif 'false' in mode.lower():
        return False
    return False


@app.route('/ping')
def ping():
    return 'PONG'


@app.route('/<path:filename>')  # TODO: verify and update if needed
def serve_static(filename):
    try:
        return send_from_directory(STATIC_DIR, filename)
    except FileNotFoundError:
        abort(404)
    except Exception as e:
        print(f'there was an error: {e}')


if __name__ == '__main__':
    app.run(
        debug=is_production_mode(ENV['DEBUG']),
        port=ENV['SERVER_PORT']
    )
