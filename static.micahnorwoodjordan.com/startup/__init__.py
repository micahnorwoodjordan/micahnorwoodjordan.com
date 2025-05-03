from flask import Flask

from .tasks.install_artifacts import install_s3_artifacts


def create_app():
    app = Flask(__name__)

    # Register blueprints or import routes
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    install_s3_artifacts()

    return app
