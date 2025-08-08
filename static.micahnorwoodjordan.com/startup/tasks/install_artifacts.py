from aws.s3.client import S3Client


def install_s3_artifacts():
    s3_client = S3Client()
    s3_client.sync('static')
