import { CfnResource, Duration, Stack, StackProps } from "aws-cdk-lib";
import { Effect, Policy, PolicyDocument, PolicyStatement, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export class EventbridgeSchedulerStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
      super(scope, id, props);
  
            // 1. Defining our Lambda Functions
            // const recurringLambda = new NodejsFunction(this, 'RecurringLambda', {
            //     entry: './resources/recurring.ts',
            //     handler: 'handler',
            //     runtime: Runtime.NODEJS_16_X,
            //     timeout: Duration.seconds(10),
            // });
    
            const oneOffLambda = new NodejsFunction(this, 'OneOffLambda', {
                entry: './resources/one-off.ts',
                handler: 'handler',
                runtime: Runtime.NODEJS_22_X,
                timeout: Duration.seconds(10),
            });


            // 2. Define the IAM role for the scheduler to invoke our Lambda functions with
            const schedulerRole = new Role(this, 'schedulerRole', {
                assumedBy: new ServicePrincipal('scheduler.amazonaws.com'),
            });

            // 2a. Create the policy that will allow the role to invoke our functions
            //add recurringLambda.function in resources
            const invokeLambdaPolicy = new Policy(this, 'invokeLambdaPolicy', {
            document: new PolicyDocument({
                statements: [
                new PolicyStatement({
                    actions: ['lambda:InvokeFunction'],
                    resources: [oneOffLambda.functionArn],
                    effect: Effect.ALLOW,
                }),
                ],
            }),
            });

            // 2b. Attach the policy to the role
            schedulerRole.attachInlinePolicy(invokeLambdaPolicy);

                        // 3. Defining our one-off schedule
            new CfnResource(this, 'oneOffSchedule', {
            type: 'AWS::Scheduler::Schedule',
            properties: {
                Name: 'oneOffSchedule',
                Description: 'Runs a schedule at a fixed time',
                FlexibleTimeWindow: { Mode: 'OFF' },
                ScheduleExpression: 'at(2024-12-07T01:50:37)',
                Target: {
                Arn: oneOffLambda.functionArn,
                RoleArn: schedulerRole.roleArn,
                },
            },
            });

            // // 4. Defining our recurring schedule
            // new CfnResource(this, 'recurringSchedule', {
            // type: 'AWS::Scheduler::Schedule',
            // properties: {
            //     Name: 'recurringSchedule',
            //     Description: 'Runs a schedule for every 5 minutes',
            //     FlexibleTimeWindow: { Mode: 'OFF' },
            //     ScheduleExpression: 'cron(*/5 * * * ? *)',
            //     Target: {
            //     Arn: recurringLambda.functionArn,
            //     RoleArn: schedulerRole.roleArn,
            //     },
            // },
            // });
      }
  }