import { CfnOutput,Stack, StackProps} from 'aws-cdk-lib';
import {Topic} from 'aws-cdk-lib/aws-sns';
import {EmailSubscription} from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';

export class SnsEmailSubscriptionStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Define an SNS topic
    const topic = new Topic(this, 'AppointmentScheduleTopic', {
      topicName: 'AppointmentSchedule',
    });

    // Add an email subscription
    topic.addSubscription(new EmailSubscription('agnoteelijah@gmail.com'));

    // Output the topic ARN (optional)
    new CfnOutput(this, 'TopicArn', {
      value: topic.topicArn,
      description: 'The ARN of the SNS topic',
    });
  }
}
    