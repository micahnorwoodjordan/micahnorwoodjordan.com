import os


def load_dotenv_file():
    if os.environ.get('RUNNING_LOCALLY'):
        from dotenv import load_dotenv
        load_dotenv()


load_dotenv_file()

ENV = os.environ
STATIC_DIR = os.path.abspath(ENV['STATIC_DIRECTORY'])
HOST = '0.0.0.0'
