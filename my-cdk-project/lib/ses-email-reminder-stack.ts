import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ManagedPolicy, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
//import { IAwsSesSenderReminderStackProps } from '../types';

export class SesEmailsReminderStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);
    // roleName:'SesSenderReminderRole',
    // managedPolicyName:'AmazonSESFullAccess',
    // policyStatementActions: ['logs:CreateLogGroup','logs:CreateLogStream','logs:PutLogEvents'],
    // // Create SES Lambda Role
    const role = new Role(this, 'SesSenderReminderRole', { roleName:'SesSenderReminderRole', assumedBy: new ServicePrincipal('lambda.amazonaws.com')});

    // // Add SES Full Access Policy
    role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonSESFullAccess'));

    // // Add CloudWatch Logs Policy
    role.addToPrincipalPolicy(new PolicyStatement({ actions: ['logs:CreateLogGroup','logs:CreateLogStream','logs:PutLogEvents'], resources: ['*']}));

    
    // Create SES Lambda Function
    new NodejsFunction(this, 'SesSenderReminderFunction', {
    functionName: 'ses-sender-reminder-function',
    entry: 'src/reminder.ts',
    handler: 'handler',
    memorySize: 1024,
    timeout: Duration.seconds (60),
    runtime: Runtime.NODEJS_LATEST,
    role: role,
});
    
    }
}