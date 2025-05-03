import os


STATIC_DIR = os.path.abspath("/workspace/static.micahnorwoodjordan.com")
HOST = '0.0.0.0'


def load_dotenv_file():
    if os.environ.get('RUNNING_LOCALLY'):
        from dotenv import load_dotenv
        load_dotenv()


load_dotenv_file()

ENV = os.environ
