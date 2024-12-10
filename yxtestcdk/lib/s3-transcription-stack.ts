import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3notifications from 'aws-cdk-lib/aws-s3-notifications';
import * as iam from 'aws-cdk-lib/aws-iam';

export class S3TranscriptionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Import the existing S3 bucket using the bucket name
    const bucket = s3.Bucket.fromBucketName(this, 'ImportedBucket', 'testamplifybucket467c6-dev');

    // Create IAM roles for Lambda functions
    const lambdatranscribeRole = new iam.Role(this, 'LambdaTranscribeRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonTranscribeFullAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchFullAccess')
      ]
    });

    const lambdareads3Role = new iam.Role(this, 'LambdaReadS3Role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchFullAccess')
      ]
    });

    // Create Lambda function: lambdatranscribe
    const lambdatranscribe = new lambda.Function(this, 'LambdaTranscribeUpdated', {
      runtime: lambda.Runtime.PYTHON_3_13,
      handler: 'index.lambda_handler',
      code: lambda.Code.fromInline(`
import boto3
import json
import uuid
import os

def lambda_handler(event, context):
    print(json.dumps(event))
    
    record = event['Records'][0]
    
    s3bucket = record['s3']['bucket']['name']
    s3object = record['s3']['object']['key']
    
    # Remove the 'public/' part from the object key to use only the file name
    file_name = s3object.rsplit('/', 1)[-1]
    
    # Full S3 path of the uploaded file
    s3Path = f"s3://{s3bucket}/{s3object}"
    
    # Generate a unique transcription job name using the file name without the folder part
    jobName = f"{file_name}-{str(uuid.uuid4())}"
    
    # Output path for the transcription results
    outputFolder = "transcripted-jobs"
    outputKey = f"{outputFolder}/{file_name.rsplit('.', 1)[0]}.json"  # Save as JSON
    
    # Extract file extension (e.g., mp4, mp3, etc.)
    file_extension = file_name.rsplit('.', 1)[-1].lower()
    
    # Define the MediaFormat based on the file extension
    if file_extension in ['mp4', 'mov']:
        media_format = 'mp4'
    elif file_extension in ['mp3', 'ogg', 'flac']:
        media_format = 'ogg'
    else:
        media_format = 'mp4'  # Default to mp4 if unknown format
    
    client = boto3.client('transcribe')
    
    try:
        response = client.start_transcription_job(
            TranscriptionJobName=jobName,
            LanguageCode='en-US',
            MediaFormat=media_format,  # Use dynamic media format based on the file extension
            Media={
                'MediaFileUri': s3Path
            },
            OutputBucketName=s3bucket,  # Specify the same bucket
            OutputKey=outputKey         # Custom output folder and file name
        )
        
        print(json.dumps(response, default=str))
        
        return {
            'TranscriptionJobName': response['TranscriptionJob']['TranscriptionJobName'],
            'OutputLocation': f"s3://{s3bucket}/{outputKey}"
        }
    except Exception as e:
        print(f"Error: {e}")
        raise
`),
      role: lambdatranscribeRole // Assign IAM role here
    });

    // Create Lambda function: lambdareads3
    const lambdareads3 = new lambda.Function(this, 'LambdaReadS3Updated', {
      runtime: lambda.Runtime.PYTHON_3_13,
      handler: 'index.lambda_handler',
      code: lambda.Code.fromInline(`
import json
import boto3

# Initialize the S3 client
s3_client = boto3.client('s3')

def lambda_handler(event, context):
    # Print the incoming event to the CloudWatch logs for debugging
    print(json.dumps(event))
    
    # Extract details from the S3 event notification
    record = event['Records'][0]  # Assuming a single record
    bucket_name = record['s3']['bucket']['name']
    file_name = record['s3']['object']['key']
    
    # Skip processing if the file is already in the transcripts/ folder
    if file_name.startswith('transcripts/'):
        print(f"Skipping file in transcripts folder: {file_name}")
        return "File already processed."
    
    # Ensure the file is a JSON file
    if not file_name.endswith('.json'):
        print(f"Skipping non-JSON file: {file_name}")
        return "Not a JSON file."
    
    try:
        # Get the object from S3
        s3_response = s3_client.get_object(Bucket=bucket_name, Key=file_name)
        
        # Read and decode the file data
        file_data = s3_response["Body"].read().decode('utf-8')
        
        # Parse the JSON data
        try:
            json_data = json.loads(file_data)
        except json.JSONDecodeError:
            print(f"Invalid JSON file: {file_name}")
            return "Invalid JSON file."
        
        # Check if the required fields exist in the JSON data
        if 'results' in json_data and 'transcripts' in json_data['results']:
            transcripts_data = json_data['results']['transcripts']
            
            # If the transcripts list is not empty, extract the transcript
            if transcripts_data:
                transcript = transcripts_data[0]['transcript']
                
                # Create a new file name for the extracted text file
                txt_file_name = f"transcripts/{file_name.rsplit('/', 1)[-1].replace('.json', '.txt')}"
                
                # Write the transcript to a text file
                s3_client.put_object(
                    Bucket=bucket_name,
                    Key=txt_file_name,
                    Body=transcript.encode('utf-8')
                )
                
                print(f"Transcript extraction completed and saved as {txt_file_name}")
                return f"Transcript saved as {txt_file_name}"
        
        print(f"No transcripts found in JSON file: {file_name}")
        return "No transcripts found in the JSON file."
    
    except Exception as e:
        # Handle errors and log them
        print(f"Error processing file {file_name}: {str(e)}")
        return f"Error processing file: {str(e)}"
`),
      role: lambdareads3Role // Assign IAM role here
    });

    // Add event notifications for the existing S3 bucket
    bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3notifications.LambdaDestination(lambdatranscribe),
      { prefix: 'public/' }  // Changed from 'uploadfiles/' to 'public/'
    );

    bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3notifications.LambdaDestination(lambdareads3),
      { prefix: 'transcripted-jobs/' }
    );
  }
}
