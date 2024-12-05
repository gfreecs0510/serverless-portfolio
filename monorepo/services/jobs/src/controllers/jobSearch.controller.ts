import { Response } from '../../../../src/common/types.common';
import { Job, SearchResultRequest, SearchResultResponse } from '../types/jobs';
import {
  JOBS_INDEX,
  ElasticClient,
} from '../../../../src/clients/elasticsearch.client';
import { v4 } from 'uuid';
import {
  getAggregates,
  transformAggregateResult,
} from '../elasticSearch/aggregates.elasticSearch';
import {
  QueryDslQueryContainer,
  AggregationsAggregate,
  SearchHit,
} from '@opensearch-project/opensearch/api/types';
import { ApiResponse } from '@opensearch-project/opensearch';

import {
  getFilterQuery,
  getShouldMatch,
} from '../elasticSearch/queries.elasticSearch';

export async function createIndex(): Promise<Response> {
  try {
    const indexExists = await ElasticClient.getClient().indices.exists({
      index: JOBS_INDEX,
    });

    if (indexExists?.body) {
      console.log(`Index ${JOBS_INDEX} already exists.`);
      return {
        statusCode: 200,
        body: {
          message: 'index already exist',
        },
      };
    }

    const response = await ElasticClient.getClient().indices.create({
      index: JOBS_INDEX,
      body: {
        mappings: {
          properties: {
            company: { type: 'keyword' },
            country: { type: 'keyword' },
            location: { type: 'keyword' },
            preferences: { type: 'keyword' },
            workTypes: { type: 'keyword' },
            skills: { type: 'keyword' },
            industries: { type: 'keyword' },
            description: { type: 'text' },
            minSalary: { type: 'integer' },
            maxSalary: { type: 'integer' },
            minExp: { type: 'integer' },
            maxExp: { type: 'integer' },
            avgExp: { type: 'float' },
            avgSalary: { type: 'float' },
          },
        },
      },
    });

    console.log(`index ${JOBS_INDEX} created successfully:`, response);

    return {
      statusCode: 200,
      body: {
        message: `index ${JOBS_INDEX} created successfully`,
      },
    };
  } catch (error) {
    console.error('createIndex error:', error);
    return {
      statusCode: 500,
      body: {
        message: 'internal server error',
      },
    };
  }
}

export async function createUpdateRecordIndex(job: Job): Promise<Response> {
  try {
    const response = await ElasticClient.getClient().index({
      index: JOBS_INDEX,
      id: v4(),
      body: {
        ...job,
        avgSalary: (job.minSalary! + job.maxSalary!) / 2,
        avgExp: (job.minExp! + job.maxExp!) / 2,
      },
    });
    console.log('Record created/updated successfully:', response);

    return {
      statusCode: 200,
      body: {
        message: 'success',
      },
    };
  } catch (err) {
    console.log('createUpdateRecordIndex error', err);
    return {
      statusCode: 500,
      body: {
        message: 'internal server error',
      },
    };
  }
}

export async function search(request: SearchResultRequest): Promise<Response> {
  try {
    const { size = 0, from = 0, debug = false } = request;

    const filter: QueryDslQueryContainer[] = getFilterQuery(request);
    const shouldMatch = getShouldMatch(request);
    let query: QueryDslQueryContainer = {};

    if (filter.length > 0) {
      query = {
        bool: {
          filter,
          must: shouldMatch,
        },
      };
    } else {
      query = {
        match_all: {},
      };
    }

    const result: ApiResponse = await ElasticClient.getClient().search({
      index: JOBS_INDEX,
      body: {
        query,
        size,
        from,
        aggs: getAggregates(),
      },
    });

    if (result.statusCode !== 200) {
      return {
        statusCode: 400,
        body: {
          message: 'bad request',
        },
      };
    }

    const cleanHits: Job[] = result.body.hits.hits.map((h: SearchHit<Job>) => {
      return {
        score: h._score as number,
        id: h._id as string,
        ...(h._source as object),
      };
    });

    const cleanAggregates = transformAggregateResult(
      result.body.aggregations as Record<string, AggregationsAggregate>,
    );

    //worktypes is the best to count in this case
    const total = cleanAggregates.workTypes.reduce((total, workType) => {
      total += workType.doc_count;
      return total;
    }, 0);

    const body: SearchResultResponse = {
      total,
      size,
      from,
      result: cleanHits,
      filters: cleanAggregates,
      ...(debug ? { query } : {}),
    };

    return {
      statusCode: 200,
      body,
    };
  } catch (err) {
    console.log('search error', err);
    return {
      statusCode: 500,
      body: {
        message: 'internal server error',
      },
    };
  }
}
