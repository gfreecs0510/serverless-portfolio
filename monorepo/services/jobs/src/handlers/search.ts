import middy from '@middy/core';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { generateResponse } from '../../../../src/common/response.common';
import { rateLimiterMiddleware } from '../../../../src/middlewares/rateLimiter.middleware';
import { paths } from '../types/openapi.type';
import { search } from '../controllers/jobSearch.controller';
import { SearchResultRequest } from '../types/jobs';
import { elasticsearchMiddleware } from '../../../../src/middlewares/elasticsearch.middleware';
import { ajvMiddleware } from '../../../../src/middlewares/ajv.middleware';
import searchRequestSchema from '../schemas/searchRequest.schema';

type Response = paths['/search']['post']['responses']['200'];

const lambdaHandler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2<Response>> => {
  try {
    const request: SearchResultRequest = event.body?.trim()
      ? JSON.parse(event.body)
      : {};
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
  .use(ajvMiddleware(searchRequestSchema))
  .use(elasticsearchMiddleware());
