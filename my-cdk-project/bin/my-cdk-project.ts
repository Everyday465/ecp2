#!/usr/bin/env node
//import all the stacks for deployment
import * as cdk from 'aws-cdk-lib';
import { MyCdkProjectStack } from '../lib/my-cdk-project-stack';
import { S3BucketStack } from '../lib/s3-bucket-stack';
import { RestApiAwsStack } from '../lib/rest-api-aws-stack';
import { EventbridgeSchedulerStack } from '../lib/lambda-scheduler-stack';
import { SnsEmailSubscriptionStack } from '../lib/sns-subscription-stack';
import { SesEmailsStack } from '../lib/ses-email-stack';
import { SesEmailsReminderStack } from '../lib/ses-email-reminder-stack';
import { stackProps } from '../props';

const app = new cdk.App();
//new MyCdkProjectStack(app, 'MyCdkProjectStack');

//creating an s3 bucket stack
const s3_bucket_stack = new S3BucketStack(app,"s3Stack", {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });

const rest_api_aws_stack = new RestApiAwsStack(app,"restApiStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

const lambda_scheduler_stack = new EventbridgeSchedulerStack(app,"eventBridgeStack",{
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

const sns_subscription_stack = new SnsEmailSubscriptionStack(app, 'SnsEmailSubscriptionStack');

const ses_email_stack = new SesEmailsStack(app,'sesEmailStack',stackProps)

const ses_email_reminder_stach = new SesEmailsReminderStack(app,'sesEmailReminderStack',stackProps)


//reusing assets
// const bucket = s3_bucket_stack.bucket;
// const restApi = rest_api_aws_stack.;

    