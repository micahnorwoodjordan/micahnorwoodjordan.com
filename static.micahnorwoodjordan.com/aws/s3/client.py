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

    def download(self, key):
        try:
            local_filepath = os.path.basename(key)
            self.s3.download_file(self.bucket, f'{BUCKET_PREFIX}{key}', local_filepath)
        except NoCredentialsError:
            print('no credentials provided')
        except ClientError as e:
            print(f'client error: {e}')
        except Exception as e:
            print(f'error downloading file: {key}')
            raise S3Exception from e

    def download_all(self):
        objects = self.s3.list_objects_v2(Bucket=self.bucket, Prefix=BUCKET_PREFIX)
        for obj in objects.get('Contents', []):
            print(obj)
            key = obj['Key']
            self.s3.download_file(self.bucket, key, os.path.basename(key))
