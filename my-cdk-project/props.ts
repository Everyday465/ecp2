import { IAwsSesSenderStackProps } from "./types";

export const stackProps: IAwsSesSenderStackProps = {
    roleName:'SesSenderRole',
    managedPolicyName:'AmazonSESFullAccess',
    policyStatementActions: ['logs:CreateLogGroup','logs:CreateLogStream','logs:PutLogEvents'],
    functionName: 'ses-sender-function',
    functionEntry:'src/index.ts'
}

