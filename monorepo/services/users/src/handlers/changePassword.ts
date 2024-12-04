import middy from '@middy/core';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { changePassword } from '../controllers/user.controller';
import { ChangePasswordInput } from '../types/user.type';
import { generateResponse } from '../../../../src/common/response.common';
import { rateLimiterMiddleware } from '../../../../src/middlewares/rateLimiter.middleware';
import { paths } from '../types/openapi.type';
import { verifyTokenMiddleware } from '../middlewares/verifyToken.middleware';

type Response = paths['/users/changePassword']['patch']['responses']['200'];

const lambdaHandler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2<Response>> => {
  try {
    const user: ChangePasswordInput = JSON.parse(event.body as string);
    const result = await changePassword(user);
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

export const handler = middy(lambdaHandler)
  .use(rateLimiterMiddleware())
  .use(verifyTokenMiddleware());
