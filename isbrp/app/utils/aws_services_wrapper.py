import boto3

class AwsServicesWrapper:
    AWS_ACCESS_KEY_ID = ''
    AWS_SECRET_ACCESS_KEY = ''
    AWS_SESSION_TOKEN = ''
    AWS_S3_BUCKET = 'pingudevelopersbucket'

    def __init__(self):
        self.client = boto3.client('dynamodb', region_name='ap-southeast-1',
                        aws_access_key_id= self.AWS_ACCESS_KEY_ID,
                        aws_secret_access_key= self.AWS_SECRET_ACCESS_KEY,
                        aws_session_token= self.AWS_SESSION_TOKEN)

    def get_client(self):
        return self.client