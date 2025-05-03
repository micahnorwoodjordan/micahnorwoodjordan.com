from startup import create_app

from startup.install_artifacts import install_s3_artifacts

from environment.environment import ENV, HOST


app = create_app()


# TODO: log all errors instead of printing them


if __name__ == '__main__':
    install_s3_artifacts()
    app.run(
        host=HOST,
        debug=True if ENV['DEBUG'] == 'true' else False,  # TODO: this can be handled more gracefully
        port=ENV['SERVER_PORT']
    )
