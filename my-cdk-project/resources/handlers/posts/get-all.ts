// ./resources/handlers/posts/get-all.ts

import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

const dynamodb = new DynamoDB({});
//should use query
export async function getAll() {
  const result = await dynamodb.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME,
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items),
  };
}