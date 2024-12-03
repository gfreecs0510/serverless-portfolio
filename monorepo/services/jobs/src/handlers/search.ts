import middy from '@middy/core';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { generateResponse } from '../../../../src/common/response.common';
import { rateLimiterMiddleware } from '../../../users/src/middlewares/rateLimiter.middleware';
import { paths } from '../types/openapi.type';
import { search } from '../controllers/jobSearch.controller';
import { SearchResultRequest } from '../types/jobSearch.type';
import { elasticsearchMiddleware } from '../../../../src/middlewares/elasticsearch.middleware';

type Response = paths['/search']['post']['responses']['200'];

const lambdaHandler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2<Response>> => {
  try {
    const request: SearchResultRequest = JSON.parse(event.body as string);
    const result = await search(request);
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
  .use(elasticsearchMiddleware());
