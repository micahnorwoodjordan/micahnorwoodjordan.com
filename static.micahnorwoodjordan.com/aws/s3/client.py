import os
import boto3

from botocore.exceptions import NoCredentialsError, ClientError


class S3Exception(Exception):
    pass


BUCKET_PREFIX = 'static/'


class S3Client:
    def __init__(self, aws_access_key_id, aws_secret_access_key, region_name, bucket):
        self.aws_access_key_id = aws_access_key_id
        self.aws_secret_access_key = aws_secret_access_key
        self.region_name = region_name
        self.bucket = bucket
        self.s3 = boto3.client('s3')

    def download_all(self):
        objects = self.s3.list_objects_v2(Bucket=self.bucket, Prefix=BUCKET_PREFIX)
        for obj in objects.get('Contents', []):
            key = obj['Key']
            filename = os.path.basename(key)

            if key != BUCKET_PREFIX:
                try:
                    self.s3.download_file(self.bucket, key, filename)
                    print(f'downloaded s3 file: {filename}')
                except Exception as e:
                    print(f'error downloading file: {filename}')
