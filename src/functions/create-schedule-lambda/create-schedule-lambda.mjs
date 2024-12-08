import { EventBridge, Lambda } from 'aws-sdk';

const eventbridge = new EventBridge();
const lambda = new Lambda();

export const handler = async (event) => {
  const { email } = event; // Email passed from React frontend

  // Get the current time and add 2 minutes
  const currentTime = new Date();
  currentTime.setMinutes(currentTime.getMinutes() + 2);

  // Format the time into the required cron format: YYYY-MM-DDTHH:MM:SSZ
  const scheduleTime = currentTime.toISOString();

  const ruleName = `ScheduleRule-${Date.now()}`;
  const targetLambdaArn = "arn:aws:lambda:us-east-1:058264429730:function:ses-sender-reminder-function"; // Replace with your target Lambda ARN

  // Create the EventBridge rule (One-time schedule)
  const ruleParams = {
    Name: ruleName,
    ScheduleExpression: `at(${scheduleTime})`, // Specify the exact time
    State: "ENABLED",
  };

  try {
    const ruleResponse = await eventbridge.putRule(ruleParams).promise();

    // Define the target for the rule (the Lambda function to invoke)
    const targetParams = {
      Rule: ruleName,
      Targets: [
        {
          Id: "1",
          Arn: targetLambdaArn,
          Input: JSON.stringify({ email }), // Pass email to the target Lambda
        },
      ],
    };

    // Add the Lambda target to the rule
    await eventbridge.putTargets(targetParams).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "EventBridge schedule created successfully" }),
    };
  } catch (error) {
    console.error("Error creating EventBridge rule:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to create schedule" }),
    };
  }
};
