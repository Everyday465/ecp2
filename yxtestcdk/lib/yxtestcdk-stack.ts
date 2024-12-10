import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import *  as s3 from 'aws-cdk-lib/aws-s3';

export class S3Bucket extends cdk.Stack {
  public readonly bucket: s3.Bucket;

  constructor(scope: Construct,id:string,props?: cdk.StackProps){
    super(scope,id,props);  

    //this code defines stack goes here
    this.bucket = new s3.Bucket(this, "ecptestbucket",{
      versioned:false,
      bucketName:"ecptestbucket",
      publicReadAccess:false,
      blockPublicAccess:s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy:cdk.RemovalPolicy.DESTROY
    })
  }
}
