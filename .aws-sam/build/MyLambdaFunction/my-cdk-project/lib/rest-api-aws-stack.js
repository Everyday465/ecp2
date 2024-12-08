"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestApiAwsStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const aws_lambda_nodejs_1 = require("aws-cdk-lib/aws-lambda-nodejs");
class RestApiAwsStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // 1. Create our DynamoDB table
        const dbTable = new aws_dynamodb_1.Table(this, 'DbTable', {
            partitionKey: { name: 'pk', type: aws_dynamodb_1.AttributeType.STRING },
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            billingMode: aws_dynamodb_1.BillingMode.PAY_PER_REQUEST,
        });
        // 2. Create our API Gateway
        const api = new aws_apigateway_1.RestApi(this, 'RestAPI', {
            restApiName: 'RestAPI',
            defaultCorsPreflightOptions: {
                allowOrigins: aws_apigateway_1.Cors.ALL_ORIGINS,
                allowMethods: aws_apigateway_1.Cors.ALL_METHODS,
            },
            apiKeySourceType: aws_apigateway_1.ApiKeySourceType.HEADER,
        });
        // 3. Create our API Key
        const apiKey = new aws_apigateway_1.ApiKey(this, 'ApiKey');
        // 4. Create a usage plan and add the API key to it
        const usagePlan = new aws_apigateway_1.UsagePlan(this, 'UsagePlan', {
            name: 'Usage Plan',
            apiStages: [
                {
                    api,
                    stage: api.deploymentStage,
                },
            ],
        });
        usagePlan.addApiKey(apiKey);
        // 5. Create our Lambda functions to handle requests
        const postsLambda = new aws_lambda_nodejs_1.NodejsFunction(this, 'PostsLambda', {
            entry: 'resources/endpoints/posts.ts',
            handler: 'handler',
            environment: {
                TABLE_NAME: dbTable.tableName,
            },
        });
        const postLambda = new aws_lambda_nodejs_1.NodejsFunction(this, 'PostLambda', {
            entry: 'resources/endpoints/post.ts',
            handler: 'handler',
            environment: {
                TABLE_NAME: dbTable.tableName,
            },
        });
        // 6. Grant our Lambda functions access to our DynamoDB table
        dbTable.grantReadWriteData(postsLambda);
        dbTable.grantReadWriteData(postLambda);
        // 7. Define our API Gateway endpoints
        const posts = api.root.addResource('posts');
        const post = posts.addResource('{id}');
        // 8. Connect our Lambda functions to our API Gateway endpoints
        const postsIntegration = new aws_apigateway_1.LambdaIntegration(postsLambda);
        const postIntegration = new aws_apigateway_1.LambdaIntegration(postLambda);
        // 9. Define our API Gateway methods
        posts.addMethod('GET', postsIntegration, {
            apiKeyRequired: true,
        });
        posts.addMethod('POST', postsIntegration, {
            apiKeyRequired: true,
        });
        post.addMethod('GET', postIntegration, {
            apiKeyRequired: true,
        });
        post.addMethod('DELETE', postIntegration, {
            apiKeyRequired: true,
        });
        // Misc: Outputs
        new aws_cdk_lib_1.CfnOutput(this, 'API Key ID', {
            value: apiKey.keyId,
        });
    }
}
exports.RestApiAwsStack = RestApiAwsStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdC1hcGktYXdzLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzdC1hcGktYXdzLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUF5RTtBQUN6RSwrREFBbUg7QUFDbkgsMkRBQTZFO0FBQzdFLHFFQUErRDtBQUcvRCxNQUFhLGVBQWdCLFNBQVEsbUJBQUs7SUFDdEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUN4RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV2QiwrQkFBK0I7UUFDcEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxvQkFBSyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDdkMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDeEQsYUFBYSxFQUFFLDJCQUFhLENBQUMsT0FBTztZQUNwQyxXQUFXLEVBQUUsMEJBQVcsQ0FBQyxlQUFlO1NBQ3pDLENBQUMsQ0FBQztRQUVILDRCQUE0QjtRQUM5QixNQUFNLEdBQUcsR0FBRyxJQUFJLHdCQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNyQyxXQUFXLEVBQUUsU0FBUztZQUN0QiwyQkFBMkIsRUFBRTtnQkFDM0IsWUFBWSxFQUFFLHFCQUFJLENBQUMsV0FBVztnQkFDOUIsWUFBWSxFQUFFLHFCQUFJLENBQUMsV0FBVzthQUMvQjtZQUNELGdCQUFnQixFQUFFLGlDQUFnQixDQUFDLE1BQU07U0FDMUMsQ0FBQyxDQUFDO1FBR0gsd0JBQXdCO1FBQzFCLE1BQU0sTUFBTSxHQUFHLElBQUksdUJBQU0sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFHMUMsbURBQW1EO1FBQ25ELE1BQU0sU0FBUyxHQUFHLElBQUksMEJBQVMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQy9DLElBQUksRUFBRSxZQUFZO1lBQ2xCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxHQUFHO29CQUNILEtBQUssRUFBRSxHQUFHLENBQUMsZUFBZTtpQkFDM0I7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVMLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFNUIsb0RBQW9EO1FBQ3BELE1BQU0sV0FBVyxHQUFHLElBQUksa0NBQWMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3hELEtBQUssRUFBRSw4QkFBOEI7WUFDckMsT0FBTyxFQUFFLFNBQVM7WUFDbEIsV0FBVyxFQUFFO2dCQUNYLFVBQVUsRUFBRSxPQUFPLENBQUMsU0FBUzthQUM5QjtTQUNGLENBQUMsQ0FBQztRQUVMLE1BQU0sVUFBVSxHQUFHLElBQUksa0NBQWMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ3RELEtBQUssRUFBRSw2QkFBNkI7WUFDcEMsT0FBTyxFQUFFLFNBQVM7WUFDbEIsV0FBVyxFQUFFO2dCQUNYLFVBQVUsRUFBRSxPQUFPLENBQUMsU0FBUzthQUM5QjtTQUNGLENBQUMsQ0FBQztRQUVMLDZEQUE2RDtRQUM3RCxPQUFPLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXZDLHNDQUFzQztRQUN0QyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXZDLCtEQUErRDtRQUMvRCxNQUFNLGdCQUFnQixHQUFHLElBQUksa0NBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUQsTUFBTSxlQUFlLEdBQUcsSUFBSSxrQ0FBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUxRCxvQ0FBb0M7UUFDcEMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUU7WUFDckMsY0FBYyxFQUFFLElBQUk7U0FDdkIsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUU7WUFDdEMsY0FBYyxFQUFFLElBQUk7U0FDdkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsZUFBZSxFQUFFO1lBQ25DLGNBQWMsRUFBRSxJQUFJO1NBQ3ZCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRTtZQUN0QyxjQUFjLEVBQUUsSUFBSTtTQUN2QixDQUFDLENBQUM7UUFFSCxnQkFBZ0I7UUFDaEIsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDOUIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1NBQ3RCLENBQUMsQ0FBQztJQUVILENBQUM7Q0FDSjtBQXpGRCwwQ0F5RkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZm5PdXRwdXQsIFJlbW92YWxQb2xpY3ksIFN0YWNrLCBTdGFja1Byb3BzfSBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCB7IEFwaUtleSwgQXBpS2V5U291cmNlVHlwZSwgQ29ycywgTGFtYmRhSW50ZWdyYXRpb24sIFJlc3RBcGksIFVzYWdlUGxhbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5JztcclxuaW1wb3J0IHsgQXR0cmlidXRlVHlwZSwgQmlsbGluZ01vZGUsIFRhYmxlIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiJztcclxuaW1wb3J0IHsgTm9kZWpzRnVuY3Rpb24gfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhLW5vZGVqcyc7XHJcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlc3RBcGlBd3NTdGFjayBleHRlbmRzIFN0YWNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG5cclxuICAgICAgICAgLy8gMS4gQ3JlYXRlIG91ciBEeW5hbW9EQiB0YWJsZVxyXG4gICAgY29uc3QgZGJUYWJsZSA9IG5ldyBUYWJsZSh0aGlzLCAnRGJUYWJsZScsIHtcclxuICAgICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ3BrJywgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcgfSxcclxuICAgICAgICByZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LkRFU1RST1ksXHJcbiAgICAgICAgYmlsbGluZ01vZGU6IEJpbGxpbmdNb2RlLlBBWV9QRVJfUkVRVUVTVCxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyAyLiBDcmVhdGUgb3VyIEFQSSBHYXRld2F5XHJcbiAgICBjb25zdCBhcGkgPSBuZXcgUmVzdEFwaSh0aGlzLCAnUmVzdEFQSScsIHtcclxuICAgICAgICByZXN0QXBpTmFtZTogJ1Jlc3RBUEknLFxyXG4gICAgICAgIGRlZmF1bHRDb3JzUHJlZmxpZ2h0T3B0aW9uczoge1xyXG4gICAgICAgICAgYWxsb3dPcmlnaW5zOiBDb3JzLkFMTF9PUklHSU5TLFxyXG4gICAgICAgICAgYWxsb3dNZXRob2RzOiBDb3JzLkFMTF9NRVRIT0RTLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXBpS2V5U291cmNlVHlwZTogQXBpS2V5U291cmNlVHlwZS5IRUFERVIsXHJcbiAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgIC8vIDMuIENyZWF0ZSBvdXIgQVBJIEtleVxyXG4gICAgY29uc3QgYXBpS2V5ID0gbmV3IEFwaUtleSh0aGlzLCAnQXBpS2V5Jyk7XHJcblxyXG5cclxuICAgIC8vIDQuIENyZWF0ZSBhIHVzYWdlIHBsYW4gYW5kIGFkZCB0aGUgQVBJIGtleSB0byBpdFxyXG4gICAgY29uc3QgdXNhZ2VQbGFuID0gbmV3IFVzYWdlUGxhbih0aGlzLCAnVXNhZ2VQbGFuJywge1xyXG4gICAgICAgIG5hbWU6ICdVc2FnZSBQbGFuJyxcclxuICAgICAgICBhcGlTdGFnZXM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgYXBpLFxyXG4gICAgICAgICAgICBzdGFnZTogYXBpLmRlcGxveW1lbnRTdGFnZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSk7XHJcbiAgXHJcbiAgICB1c2FnZVBsYW4uYWRkQXBpS2V5KGFwaUtleSk7XHJcblxyXG4gICAgLy8gNS4gQ3JlYXRlIG91ciBMYW1iZGEgZnVuY3Rpb25zIHRvIGhhbmRsZSByZXF1ZXN0c1xyXG4gICAgY29uc3QgcG9zdHNMYW1iZGEgPSBuZXcgTm9kZWpzRnVuY3Rpb24odGhpcywgJ1Bvc3RzTGFtYmRhJywge1xyXG4gICAgICAgIGVudHJ5OiAncmVzb3VyY2VzL2VuZHBvaW50cy9wb3N0cy50cycsXHJcbiAgICAgICAgaGFuZGxlcjogJ2hhbmRsZXInLFxyXG4gICAgICAgIGVudmlyb25tZW50OiB7XHJcbiAgICAgICAgICBUQUJMRV9OQU1FOiBkYlRhYmxlLnRhYmxlTmFtZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICBcclxuICAgIGNvbnN0IHBvc3RMYW1iZGEgPSBuZXcgTm9kZWpzRnVuY3Rpb24odGhpcywgJ1Bvc3RMYW1iZGEnLCB7XHJcbiAgICAgICAgZW50cnk6ICdyZXNvdXJjZXMvZW5kcG9pbnRzL3Bvc3QudHMnLFxyXG4gICAgICAgIGhhbmRsZXI6ICdoYW5kbGVyJyxcclxuICAgICAgICBlbnZpcm9ubWVudDoge1xyXG4gICAgICAgICAgVEFCTEVfTkFNRTogZGJUYWJsZS50YWJsZU5hbWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgLy8gNi4gR3JhbnQgb3VyIExhbWJkYSBmdW5jdGlvbnMgYWNjZXNzIHRvIG91ciBEeW5hbW9EQiB0YWJsZVxyXG4gICAgZGJUYWJsZS5ncmFudFJlYWRXcml0ZURhdGEocG9zdHNMYW1iZGEpO1xyXG4gICAgZGJUYWJsZS5ncmFudFJlYWRXcml0ZURhdGEocG9zdExhbWJkYSk7XHJcblxyXG4gICAgLy8gNy4gRGVmaW5lIG91ciBBUEkgR2F0ZXdheSBlbmRwb2ludHNcclxuICAgIGNvbnN0IHBvc3RzID0gYXBpLnJvb3QuYWRkUmVzb3VyY2UoJ3Bvc3RzJyk7XHJcbiAgICBjb25zdCBwb3N0ID0gcG9zdHMuYWRkUmVzb3VyY2UoJ3tpZH0nKTtcclxuXHJcbiAgICAvLyA4LiBDb25uZWN0IG91ciBMYW1iZGEgZnVuY3Rpb25zIHRvIG91ciBBUEkgR2F0ZXdheSBlbmRwb2ludHNcclxuICAgIGNvbnN0IHBvc3RzSW50ZWdyYXRpb24gPSBuZXcgTGFtYmRhSW50ZWdyYXRpb24ocG9zdHNMYW1iZGEpO1xyXG4gICAgY29uc3QgcG9zdEludGVncmF0aW9uID0gbmV3IExhbWJkYUludGVncmF0aW9uKHBvc3RMYW1iZGEpO1xyXG5cclxuICAgIC8vIDkuIERlZmluZSBvdXIgQVBJIEdhdGV3YXkgbWV0aG9kc1xyXG4gICAgcG9zdHMuYWRkTWV0aG9kKCdHRVQnLCBwb3N0c0ludGVncmF0aW9uLCB7XHJcbiAgICAgICAgYXBpS2V5UmVxdWlyZWQ6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIHBvc3RzLmFkZE1ldGhvZCgnUE9TVCcsIHBvc3RzSW50ZWdyYXRpb24sIHtcclxuICAgICAgICBhcGlLZXlSZXF1aXJlZDogdHJ1ZSxcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBwb3N0LmFkZE1ldGhvZCgnR0VUJywgcG9zdEludGVncmF0aW9uLCB7XHJcbiAgICAgICAgYXBpS2V5UmVxdWlyZWQ6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIHBvc3QuYWRkTWV0aG9kKCdERUxFVEUnLCBwb3N0SW50ZWdyYXRpb24sIHtcclxuICAgICAgICBhcGlLZXlSZXF1aXJlZDogdHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE1pc2M6IE91dHB1dHNcclxuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ0FQSSBLZXkgSUQnLCB7XHJcbiAgICAgICAgdmFsdWU6IGFwaUtleS5rZXlJZCxcclxuICAgIH0pO1xyXG5cclxuICAgIH0gXHJcbn0iXX0=