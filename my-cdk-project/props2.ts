import { IAwsSesSenderReminderStackProps } from "./types";

//not in use
export const stackProps2: IAwsSesSenderReminderStackProps = {
    roleName:'SesSenderReminderRole',
    managedPolicyName:'AmazonSESFullAccess',
    policyStatementActions: ['logs:CreateLogGroup','logs:CreateLogStream','logs:PutLogEvents'],
    functionName: 'ses-sender-reminder-function',
    functionEntry:'src/reminder.ts'
}