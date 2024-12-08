"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnsEmailSubscriptionStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_sns_1 = require("aws-cdk-lib/aws-sns");
const aws_sns_subscriptions_1 = require("aws-cdk-lib/aws-sns-subscriptions");
class SnsEmailSubscriptionStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Define an SNS topic
        const topic = new aws_sns_1.Topic(this, 'AppointmentScheduleTopic', {
            topicName: 'AppointmentSchedule',
        });
        // Add an email subscription
        topic.addSubscription(new aws_sns_subscriptions_1.EmailSubscription('agnoteelijah@gmail.com'));
        // Output the topic ARN (optional)
        new aws_cdk_lib_1.CfnOutput(this, 'TopicArn', {
            value: topic.topicArn,
            description: 'The ARN of the SNS topic',
        });
    }
}
exports.SnsEmailSubscriptionStack = SnsEmailSubscriptionStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25zLXN1YnNjcmlwdGlvbi1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNucy1zdWJzY3JpcHRpb24tc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXlEO0FBQ3pELGlEQUEwQztBQUMxQyw2RUFBb0U7QUFHcEUsTUFBYSx5QkFBMEIsU0FBUSxtQkFBSztJQUNsRCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLHNCQUFzQjtRQUN0QixNQUFNLEtBQUssR0FBRyxJQUFJLGVBQUssQ0FBQyxJQUFJLEVBQUUsMEJBQTBCLEVBQUU7WUFDeEQsU0FBUyxFQUFFLHFCQUFxQjtTQUNqQyxDQUFDLENBQUM7UUFFSCw0QkFBNEI7UUFDNUIsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLHlDQUFpQixDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztRQUV2RSxrQ0FBa0M7UUFDbEMsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDOUIsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRO1lBQ3JCLFdBQVcsRUFBRSwwQkFBMEI7U0FDeEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBbEJELDhEQWtCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENmbk91dHB1dCxTdGFjaywgU3RhY2tQcm9wc30gZnJvbSAnYXdzLWNkay1saWInO1xyXG5pbXBvcnQge1RvcGljfSBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc25zJztcclxuaW1wb3J0IHtFbWFpbFN1YnNjcmlwdGlvbn0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXNucy1zdWJzY3JpcHRpb25zJztcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XHJcblxyXG5leHBvcnQgY2xhc3MgU25zRW1haWxTdWJzY3JpcHRpb25TdGFjayBleHRlbmRzIFN0YWNrIHtcclxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG5cclxuICAgIC8vIERlZmluZSBhbiBTTlMgdG9waWNcclxuICAgIGNvbnN0IHRvcGljID0gbmV3IFRvcGljKHRoaXMsICdBcHBvaW50bWVudFNjaGVkdWxlVG9waWMnLCB7XHJcbiAgICAgIHRvcGljTmFtZTogJ0FwcG9pbnRtZW50U2NoZWR1bGUnLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQWRkIGFuIGVtYWlsIHN1YnNjcmlwdGlvblxyXG4gICAgdG9waWMuYWRkU3Vic2NyaXB0aW9uKG5ldyBFbWFpbFN1YnNjcmlwdGlvbignYWdub3RlZWxpamFoQGdtYWlsLmNvbScpKTtcclxuXHJcbiAgICAvLyBPdXRwdXQgdGhlIHRvcGljIEFSTiAob3B0aW9uYWwpXHJcbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdUb3BpY0FybicsIHtcclxuICAgICAgdmFsdWU6IHRvcGljLnRvcGljQXJuLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJ1RoZSBBUk4gb2YgdGhlIFNOUyB0b3BpYycsXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19