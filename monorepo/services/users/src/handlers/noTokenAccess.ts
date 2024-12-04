import middy from '@middy/core';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { allowed } from '../controllers/user.controller';
import { generateResponse } from '../../../../src/common/response.common';
import { rateLimiterMiddleware } from '../../../../src/middlewares/rateLimiter.middleware';
import { paths } from '../types/openapi.type';

type Response = paths['/users/noTokenAccess']['post']['responses']['200'];

const lambdaHandler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2<Response>> => {
  try {
    const result = await allowed();
    return generateResponse(result);
  } catch (error) {
    console.error('Error:', error as Error);
    return generateResponse({
      statusCode: 500,
      body: {
        message: 'internal server error',
      },
    });
  }
};

export const handler = middy(lambdaHandler).use(rateLimiterMiddleware());
