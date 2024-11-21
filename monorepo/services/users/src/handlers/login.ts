import middy from '@middy/core';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { login } from '../controllers/user.controller';
import { UserRequest } from '../types/user.type';
import { generateResponse } from '../../../../src/common/response.common';
import { rateLimiterMiddleware } from '../middlewares/rateLimiter.middleware';
import { paths } from '../types/openapi.type';

type Response = paths['/users/login']['post']['responses']['200'];

const lambdaHandler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2<Response>> => {
  try {
    const user: UserRequest = JSON.parse(event.body as string);
    const result = await login(user);
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
