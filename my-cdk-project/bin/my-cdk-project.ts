#!/usr/bin/env node
//import all the stacks for deployment
import * as cdk from 'aws-cdk-lib';
import { MyCdkProjectStack } from '../lib/my-cdk-project-stack';
import { S3BucketStack } from '../lib/s3-bucket-stack';

const app = new cdk.App();
//new MyCdkProjectStack(app, 'MyCdkProjectStack');
//creating an s3 bucket stack
const s3_bucket_stack = new S3BucketStack(app,"s3Stack", {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
//reusing assets
const bucket = s3_bucket_stack.bucket;
    