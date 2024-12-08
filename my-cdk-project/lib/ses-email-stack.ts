import { CfnOutput, Duration, Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ManagedPolicy, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { IAwsSesSenderStackProps } from '../types';

export class SesEmailsStack extends Stack {
    constructor(scope: Construct, id: string, props: IAwsSesSenderStackProps) {
    super(scope, id, props);

    // Create SES Lambda Role
    const role = new Role(this, 'SesSenderRole', { roleName: props.roleName, assumedBy: new ServicePrincipal('lambda.amazonaws.com')});

    // Add SES Full Access Policy
    role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName(props.managedPolicyName));

    // Add CloudWatch Logs Policy
    role.addToPrincipalPolicy(new PolicyStatement({ actions: props.policyStatementActions, resources: ['*']}));

    // Create SES Lambda Function
    new NodejsFunction(this, 'SesSenderFunction', {
    
    functionName: props.functionName,
    entry: props.functionEntry,
    handler: 'handler',
    memorySize: 1024,
    timeout: Duration.seconds (60),
    runtime: Runtime.NODEJS_LATEST,
     role: role,
});

new CfnOutput(this, 'SesSenderRoleArn', {
    value: role.roleArn,
    exportName: 'SesSenderRoleArnExport'
});    
    }
}