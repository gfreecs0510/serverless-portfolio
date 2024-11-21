import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { Response } from './types.common';

export const generateResponse = (
  response: Response,
): APIGatewayProxyStructuredResultV2 => {
  return {
    statusCode: response.statusCode,
    body: JSON.stringify(response.body),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
