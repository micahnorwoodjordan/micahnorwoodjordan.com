import os

from flask import Flask, send_from_directory, abort

from aws.s3.client import S3Client

from environment.environment import ENV, HOST, STATIC_DIR


# TODO: log all errors instead of printing them


app = Flask(__name__)

s3_client = S3Client(ENV['AWS_ACCESS_KEY_ID'], ENV['AWS_SECRET_ACCESS_KEY'], ENV['REGION_NAME'], ENV['BUCKET'])


@app.route('/ping')
def ping():
    return 'PONG'


@app.route('/<path:filename>')
def serve_static(filename):
    try:
        return send_from_directory(STATIC_DIR, filename)
    except FileNotFoundError:
        abort(404)
    except Exception as e:
        print(f'there was an error: {e}')


if __name__ == '__main__':
    s3_client.download_all()
    app.run(
        host=HOST,
        debug=True if ENV['DEBUG'] == 'true' else False,  # TODO: this can be handled more gracefully
        port=ENV['SERVER_PORT']
    )
