from aws.s3.client import S3Client

from environment.environment import ENV


def install_s3_artifacts():
    s3_client = S3Client(ENV['AWS_ACCESS_KEY_ID'], ENV['AWS_SECRET_ACCESS_KEY'], ENV['REGION_NAME'], ENV['BUCKET'])
    s3_client.download_all()
