from startup import create_app

from startup.install_artifacts import install_s3_artifacts

from environment.environment import ENV, HOST


app = create_app()
