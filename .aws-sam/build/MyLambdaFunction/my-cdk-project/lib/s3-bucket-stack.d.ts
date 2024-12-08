import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
export declare class S3BucketStack extends Stack {
    readonly bucket: s3.Bucket;
    constructor(scope: Construct, id: string, props?: StackProps);
}
