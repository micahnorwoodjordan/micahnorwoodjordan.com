from flask import Flask

from flask_cors import CORS

from .tasks.install_artifacts import install_s3_artifacts


def create_app():
    app = Flask(__name__)
    CORS(app, origins=['https://micahnorwoodjordan.com'])

    # Register blueprints or import routes
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    install_s3_artifacts()

    return app
