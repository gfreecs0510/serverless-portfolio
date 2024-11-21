import middy from '@middy/core';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { verified } from '../controllers/user.controller';
import { generateResponse } from '../../../../src/common/response.common';
import { rateLimiterMiddleware } from '../middlewares/rateLimiter.middleware';
import { paths } from '../types/openapi.type';
import {
  verifyTokenMiddleware,
  user,
} from '../middlewares/verifyToken.middleware';
import { User } from '../types/user.type';

type Response = paths['/users/noTokenAccess']['post']['responses']['200'];

const lambdaHandler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2<Response>> => {
  try {
    const result = await verified(user as User);
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
