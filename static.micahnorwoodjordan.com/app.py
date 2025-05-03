from startup import create_app

from environment.environment import ENV, HOST


app = create_app()


# TODO: log all errors instead of printing them


if __name__ == '__main__':
    app.run(
        host=HOST,
        debug=True if ENV['DEBUG'] == 'true' else False,  # TODO: this can be handled more gracefully
        port=ENV['SERVER_PORT']
    )
