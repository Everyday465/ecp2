// ./resources/endpoints/post.ts

import { APIGatewayProxyEvent } from 'aws-lambda';
import { getOne } from '../handlers/posts/get-one';
import { deletePost } from '../handlers/posts/delete';

export const handler = async (event: APIGatewayProxyEvent) => {
  const id = event.pathParameters?.id;

  if (!id) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins or specify a domain
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowed methods
        'Access-Control-Allow-Headers': 'Content-Type, x-api-key', // Allowed headers
      },
      body: JSON.stringify({ message: 'Missing path parameter: id' }),
    };
  }

  try {
    // Handle different HTTP methods
    switch (event.httpMethod) {
      case 'GET':
        return await getOne({ id });
      case 'DELETE':
        return await deletePost({ id });
      default:
        return {
          statusCode: 400,
          headers: {
            'Access-Control-Allow-Origin': '*', // Allow all origins or specify a domain
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowed methods
            'Access-Control-Allow-Headers': 'Content-Type, x-api-key', // Allowed headers
          },
          body: JSON.stringify({ message: 'Invalid HTTP method' }),
        };
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins or specify a domain
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowed methods
        'Access-Control-Allow-Headers': 'Content-Type, x-api-key', // Allowed headers
      },
      body: JSON.stringify({ message: error }),
    };
  }
};