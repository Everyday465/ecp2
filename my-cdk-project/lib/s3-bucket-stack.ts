
import {RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

//import the s3

export class S3BucketStack extends Stack {
    public readonly bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //code that definees your stacck goes here
    this.bucket = new s3.Bucket(this,"ecp-bucket-dev3",{
        versioned:false,
        bucketName: "ecp-bucket-dev3",
        publicReadAccess: false,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        removalPolicy: RemovalPolicy.DESTROY
    });
  }
}
