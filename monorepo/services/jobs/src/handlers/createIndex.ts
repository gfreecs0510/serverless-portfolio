import middy from '@middy/core';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { generateResponse } from '../../../../src/common/response.common';
import { rateLimiterMiddleware } from '../../../../src/middlewares/rateLimiter.middleware';
import { createIndex } from '../controllers/jobSearch.controller';
import { SearchResultRequest } from '../types/jobs';
import { elasticsearchMiddleware } from '../../../../src/middlewares/elasticsearch.middleware';

const lambdaHandler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  try {
    const result = await createIndex();
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

export const handler = middy(lambdaHandler).use(elasticsearchMiddleware());
