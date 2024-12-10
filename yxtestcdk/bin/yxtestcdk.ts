import * as cdk from 'aws-cdk-lib';
import { S3TranscriptionStack } from '../lib/s3-transcription-stack';

const app = new cdk.App();
new S3TranscriptionStack(app, 'S3TranscriptionStack');
