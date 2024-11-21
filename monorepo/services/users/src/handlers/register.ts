import middy from '@middy/core';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { register } from '../controllers/user.controller';
import { UserRequest } from '../types/user.type';
import { generateResponse } from '../../../../src/common/response.common';
import { rateLimiterMiddleware } from '../middlewares/rateLimiter.middleware';
import { paths } from '../types/openapi.type';

type Response = paths['/users/register']['post']['responses']['201'];

const lambdaHandler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2<Response>> => {
  try {
    console.log('i am here in the register');
    const user: UserRequest = JSON.parse(event.body as string);
    const result = await register(user);
    console.log('result of register');
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
