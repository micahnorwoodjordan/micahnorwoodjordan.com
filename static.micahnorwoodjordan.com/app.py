import os

from flask import Flask, send_from_directory, abort

from aws.s3.client import S3Client

from environment.parse_variables import is_production_mode


ENV = os.environ
STATIC_DIR = os.path.abspath("files")  # TODO: update
HOST = '0.0.0.0'


app = Flask(__name__)

s3_client = S3Client(
    ENV['AWS_ACCESS_KEY_ID'],
    ENV['AWS_SECRET_ACCESS_KEY'],
    ENV['REGION_NAME'],
    ENV['BUCKET']
)


@app.route('/ping')
def ping():
    print(os.getcwd())
    s3_client.download('static/bowling-ball.png')  # test s3 call
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
        host=HOST,
        debug=is_production_mode(ENV['DEBUG']),
        port=ENV['SERVER_PORT']
    )
