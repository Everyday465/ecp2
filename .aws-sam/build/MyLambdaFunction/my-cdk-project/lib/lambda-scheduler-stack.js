"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventbridgeSchedulerStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_lambda_nodejs_1 = require("aws-cdk-lib/aws-lambda-nodejs");
class EventbridgeSchedulerStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // 1. Defining our Lambda Functions
        // const recurringLambda = new NodejsFunction(this, 'RecurringLambda', {
        //     entry: './resources/recurring.ts',
        //     handler: 'handler',
        //     runtime: Runtime.NODEJS_16_X,
        //     timeout: Duration.seconds(10),
        // });
        const oneOffLambda = new aws_lambda_nodejs_1.NodejsFunction(this, 'OneOffLambda', {
            entry: './resources/one-off.ts',
            handler: 'handler',
            runtime: aws_lambda_1.Runtime.NODEJS_22_X,
            timeout: aws_cdk_lib_1.Duration.seconds(10),
        });
        // 2. Define the IAM role for the scheduler to invoke our Lambda functions with
        const schedulerRole = new aws_iam_1.Role(this, 'schedulerRole', {
            assumedBy: new aws_iam_1.ServicePrincipal('scheduler.amazonaws.com'),
        });
        // 2a. Create the policy that will allow the role to invoke our functions
        //add recurringLambda.function in resources
        const invokeLambdaPolicy = new aws_iam_1.Policy(this, 'invokeLambdaPolicy', {
            document: new aws_iam_1.PolicyDocument({
                statements: [
                    new aws_iam_1.PolicyStatement({
                        actions: ['lambda:InvokeFunction'],
                        resources: [oneOffLambda.functionArn],
                        effect: aws_iam_1.Effect.ALLOW,
                    }),
                ],
            }),
        });
        // 2b. Attach the policy to the role
        schedulerRole.attachInlinePolicy(invokeLambdaPolicy);
        // 3. Defining our one-off schedule
        new aws_cdk_lib_1.CfnResource(this, 'oneOffSchedule', {
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
exports.EventbridgeSchedulerStack = EventbridgeSchedulerStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhLXNjaGVkdWxlci1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxhbWJkYS1zY2hlZHVsZXItc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXVFO0FBQ3ZFLGlEQUE4RztBQUM5Ryx1REFBaUQ7QUFDakQscUVBQStEO0FBRy9ELE1BQWEseUJBQTBCLFNBQVEsbUJBQUs7SUFDaEQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVsQixtQ0FBbUM7UUFDbkMsd0VBQXdFO1FBQ3hFLHlDQUF5QztRQUN6QywwQkFBMEI7UUFDMUIsb0NBQW9DO1FBQ3BDLHFDQUFxQztRQUNyQyxNQUFNO1FBRU4sTUFBTSxZQUFZLEdBQUcsSUFBSSxrQ0FBYyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDMUQsS0FBSyxFQUFFLHdCQUF3QjtZQUMvQixPQUFPLEVBQUUsU0FBUztZQUNsQixPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1lBQzVCLE9BQU8sRUFBRSxzQkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FDaEMsQ0FBQyxDQUFDO1FBR0gsK0VBQStFO1FBQy9FLE1BQU0sYUFBYSxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDbEQsU0FBUyxFQUFFLElBQUksMEJBQWdCLENBQUMseUJBQXlCLENBQUM7U0FDN0QsQ0FBQyxDQUFDO1FBRUgseUVBQXlFO1FBQ3pFLDJDQUEyQztRQUMzQyxNQUFNLGtCQUFrQixHQUFHLElBQUksZ0JBQU0sQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUU7WUFDbEUsUUFBUSxFQUFFLElBQUksd0JBQWMsQ0FBQztnQkFDekIsVUFBVSxFQUFFO29CQUNaLElBQUkseUJBQWUsQ0FBQzt3QkFDaEIsT0FBTyxFQUFFLENBQUMsdUJBQXVCLENBQUM7d0JBQ2xDLFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7d0JBQ3JDLE1BQU0sRUFBRSxnQkFBTSxDQUFDLEtBQUs7cUJBQ3ZCLENBQUM7aUJBQ0Q7YUFDSixDQUFDO1NBQ0QsQ0FBQyxDQUFDO1FBRUgsb0NBQW9DO1FBQ3BDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRXpDLG1DQUFtQztRQUMvQyxJQUFJLHlCQUFXLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ3hDLElBQUksRUFBRSwwQkFBMEI7WUFDaEMsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLFdBQVcsRUFBRSxpQ0FBaUM7Z0JBQzlDLGtCQUFrQixFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTtnQkFDbkMsa0JBQWtCLEVBQUUseUJBQXlCO2dCQUM3QyxNQUFNLEVBQUU7b0JBQ1IsR0FBRyxFQUFFLFlBQVksQ0FBQyxXQUFXO29CQUM3QixPQUFPLEVBQUUsYUFBYSxDQUFDLE9BQU87aUJBQzdCO2FBQ0o7U0FDQSxDQUFDLENBQUM7UUFFSCx3Q0FBd0M7UUFDeEMsK0NBQStDO1FBQy9DLG9DQUFvQztRQUNwQyxnQkFBZ0I7UUFDaEIsaUNBQWlDO1FBQ2pDLDBEQUEwRDtRQUMxRCwyQ0FBMkM7UUFDM0MsaURBQWlEO1FBQ2pELGdCQUFnQjtRQUNoQix3Q0FBd0M7UUFDeEMsc0NBQXNDO1FBQ3RDLFNBQVM7UUFDVCxLQUFLO1FBQ0wsTUFBTTtJQUNaLENBQUM7Q0FDSjtBQXhFSCw4REF3RUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZm5SZXNvdXJjZSwgRHVyYXRpb24sIFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSBcImF3cy1jZGstbGliXCI7XHJcbmltcG9ydCB7IEVmZmVjdCwgUG9saWN5LCBQb2xpY3lEb2N1bWVudCwgUG9saWN5U3RhdGVtZW50LCBSb2xlLCBTZXJ2aWNlUHJpbmNpcGFsIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1pYW1cIjtcclxuaW1wb3J0IHsgUnVudGltZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XHJcbmltcG9ydCB7IE5vZGVqc0Z1bmN0aW9uIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGEtbm9kZWpzXCI7XHJcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRXZlbnRicmlkZ2VTY2hlZHVsZXJTdGFjayBleHRlbmRzIFN0YWNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xyXG4gICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuICBcclxuICAgICAgICAgICAgLy8gMS4gRGVmaW5pbmcgb3VyIExhbWJkYSBGdW5jdGlvbnNcclxuICAgICAgICAgICAgLy8gY29uc3QgcmVjdXJyaW5nTGFtYmRhID0gbmV3IE5vZGVqc0Z1bmN0aW9uKHRoaXMsICdSZWN1cnJpbmdMYW1iZGEnLCB7XHJcbiAgICAgICAgICAgIC8vICAgICBlbnRyeTogJy4vcmVzb3VyY2VzL3JlY3VycmluZy50cycsXHJcbiAgICAgICAgICAgIC8vICAgICBoYW5kbGVyOiAnaGFuZGxlcicsXHJcbiAgICAgICAgICAgIC8vICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xNl9YLFxyXG4gICAgICAgICAgICAvLyAgICAgdGltZW91dDogRHVyYXRpb24uc2Vjb25kcygxMCksXHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IG9uZU9mZkxhbWJkYSA9IG5ldyBOb2RlanNGdW5jdGlvbih0aGlzLCAnT25lT2ZmTGFtYmRhJywge1xyXG4gICAgICAgICAgICAgICAgZW50cnk6ICcuL3Jlc291cmNlcy9vbmUtb2ZmLnRzJyxcclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6ICdoYW5kbGVyJyxcclxuICAgICAgICAgICAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzIyX1gsXHJcbiAgICAgICAgICAgICAgICB0aW1lb3V0OiBEdXJhdGlvbi5zZWNvbmRzKDEwKSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gMi4gRGVmaW5lIHRoZSBJQU0gcm9sZSBmb3IgdGhlIHNjaGVkdWxlciB0byBpbnZva2Ugb3VyIExhbWJkYSBmdW5jdGlvbnMgd2l0aFxyXG4gICAgICAgICAgICBjb25zdCBzY2hlZHVsZXJSb2xlID0gbmV3IFJvbGUodGhpcywgJ3NjaGVkdWxlclJvbGUnLCB7XHJcbiAgICAgICAgICAgICAgICBhc3N1bWVkQnk6IG5ldyBTZXJ2aWNlUHJpbmNpcGFsKCdzY2hlZHVsZXIuYW1hem9uYXdzLmNvbScpLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIDJhLiBDcmVhdGUgdGhlIHBvbGljeSB0aGF0IHdpbGwgYWxsb3cgdGhlIHJvbGUgdG8gaW52b2tlIG91ciBmdW5jdGlvbnNcclxuICAgICAgICAgICAgLy9hZGQgcmVjdXJyaW5nTGFtYmRhLmZ1bmN0aW9uIGluIHJlc291cmNlc1xyXG4gICAgICAgICAgICBjb25zdCBpbnZva2VMYW1iZGFQb2xpY3kgPSBuZXcgUG9saWN5KHRoaXMsICdpbnZva2VMYW1iZGFQb2xpY3knLCB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50OiBuZXcgUG9saWN5RG9jdW1lbnQoe1xyXG4gICAgICAgICAgICAgICAgc3RhdGVtZW50czogW1xyXG4gICAgICAgICAgICAgICAgbmV3IFBvbGljeVN0YXRlbWVudCh7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uczogWydsYW1iZGE6SW52b2tlRnVuY3Rpb24nXSxcclxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZXM6IFtvbmVPZmZMYW1iZGEuZnVuY3Rpb25Bcm5dLFxyXG4gICAgICAgICAgICAgICAgICAgIGVmZmVjdDogRWZmZWN0LkFMTE9XLFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyAyYi4gQXR0YWNoIHRoZSBwb2xpY3kgdG8gdGhlIHJvbGVcclxuICAgICAgICAgICAgc2NoZWR1bGVyUm9sZS5hdHRhY2hJbmxpbmVQb2xpY3koaW52b2tlTGFtYmRhUG9saWN5KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDMuIERlZmluaW5nIG91ciBvbmUtb2ZmIHNjaGVkdWxlXHJcbiAgICAgICAgICAgIG5ldyBDZm5SZXNvdXJjZSh0aGlzLCAnb25lT2ZmU2NoZWR1bGUnLCB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdBV1M6OlNjaGVkdWxlcjo6U2NoZWR1bGUnLFxyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgICAgICAgICBOYW1lOiAnb25lT2ZmU2NoZWR1bGUnLFxyXG4gICAgICAgICAgICAgICAgRGVzY3JpcHRpb246ICdSdW5zIGEgc2NoZWR1bGUgYXQgYSBmaXhlZCB0aW1lJyxcclxuICAgICAgICAgICAgICAgIEZsZXhpYmxlVGltZVdpbmRvdzogeyBNb2RlOiAnT0ZGJyB9LFxyXG4gICAgICAgICAgICAgICAgU2NoZWR1bGVFeHByZXNzaW9uOiAnYXQoMjAyNC0xMi0wN1QwMTo1MDozNyknLFxyXG4gICAgICAgICAgICAgICAgVGFyZ2V0OiB7XHJcbiAgICAgICAgICAgICAgICBBcm46IG9uZU9mZkxhbWJkYS5mdW5jdGlvbkFybixcclxuICAgICAgICAgICAgICAgIFJvbGVBcm46IHNjaGVkdWxlclJvbGUucm9sZUFybixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gLy8gNC4gRGVmaW5pbmcgb3VyIHJlY3VycmluZyBzY2hlZHVsZVxyXG4gICAgICAgICAgICAvLyBuZXcgQ2ZuUmVzb3VyY2UodGhpcywgJ3JlY3VycmluZ1NjaGVkdWxlJywge1xyXG4gICAgICAgICAgICAvLyB0eXBlOiAnQVdTOjpTY2hlZHVsZXI6OlNjaGVkdWxlJyxcclxuICAgICAgICAgICAgLy8gcHJvcGVydGllczoge1xyXG4gICAgICAgICAgICAvLyAgICAgTmFtZTogJ3JlY3VycmluZ1NjaGVkdWxlJyxcclxuICAgICAgICAgICAgLy8gICAgIERlc2NyaXB0aW9uOiAnUnVucyBhIHNjaGVkdWxlIGZvciBldmVyeSA1IG1pbnV0ZXMnLFxyXG4gICAgICAgICAgICAvLyAgICAgRmxleGlibGVUaW1lV2luZG93OiB7IE1vZGU6ICdPRkYnIH0sXHJcbiAgICAgICAgICAgIC8vICAgICBTY2hlZHVsZUV4cHJlc3Npb246ICdjcm9uKCovNSAqICogKiA/ICopJyxcclxuICAgICAgICAgICAgLy8gICAgIFRhcmdldDoge1xyXG4gICAgICAgICAgICAvLyAgICAgQXJuOiByZWN1cnJpbmdMYW1iZGEuZnVuY3Rpb25Bcm4sXHJcbiAgICAgICAgICAgIC8vICAgICBSb2xlQXJuOiBzY2hlZHVsZXJSb2xlLnJvbGVBcm4sXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyB9LFxyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgfVxyXG4gIH0iXX0=