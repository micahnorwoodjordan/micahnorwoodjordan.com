import os
import boto3

from concurrent.futures import ThreadPoolExecutor, as_completed

from environment.environment import ENV

from botocore.config import Config

from botocore.exceptions import NoCredentialsError, ClientError


class S3Exception(Exception):
    pass


CONFIG = Config(
    retries={'max_attempts': 5},
    max_pool_connections=5,  # concurrent connections
    connect_timeout=10,
    read_timeout=60,
    s3={'addressing_style': 'path'}
)

VALID_S3_OBJECT_KEY_EXTENSIONS = (
    '.wav',
    '.mp3',
    '.png',
    '.jpg',
    '.jpeg',
    '.ttc'
)

DEFAULT_CHUNK_SIZE_BYTES = 8192


class S3Client:
    def __init__(self):
        session = boto3.session.Session()
        self.client = session.client(
            's3',
            endpoint_url=ENV['S3_BUCKET_URL'],
            config=CONFIG,
            region_name=ENV['REGION'],
            aws_access_key_id=ENV['AWS_ACCESS_KEY'],
            aws_secret_access_key=ENV['AWS_SECRET_ACCESS_KEY']
        )
        self.bucket_name = ENV['S3_BUCKET_NAME']

    def download(self, key: str, local_filepath: str):
        try:
            response = self.client.get_object(Bucket=self.bucket_name, Key=key)
            with open(local_filepath, 'wb') as f:
                for chunk in response['Body'].iter_chunks(chunk_size=DEFAULT_CHUNK_SIZE_BYTES):
                    f.write(chunk)
        except ClientError as e:
            print(f"Failed to download {key} from {self.bucket_name}: {e.response['Error']['Message']}")

    def sync(self, prefix: str):
        """sync the contents of a remote spaces object storage bucket to local filesystem"""
        download_tasks = []
        paginator = self.client.get_paginator('list_objects_v2')
        pages = paginator.paginate(Bucket=self.bucket_name, Prefix=prefix)
        cwd = os.getcwd()

        for page in pages:
            for obj in page.get('Contents', []):
                key = obj['Key']
                filename = os.path.basename(key)
                dest_path = os.path.join(cwd, filename)

                is_valid_target = any(ext in filename for ext in VALID_S3_OBJECT_KEY_EXTENSIONS)
                if not is_valid_target:
                    continue

                print(f'downloading key: {key}')
                download_tasks.append((key, dest_path))

        # Download in parallel using thread pool
        with ThreadPoolExecutor(max_workers=10) as executor:
            futures = [executor.submit(self.download, *args) for args in download_tasks]
            for future in as_completed(futures):
                future.result()  # Re-raise exceptions if any
