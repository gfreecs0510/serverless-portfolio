import { Response } from '../../../../src/common/types.common';
import { Job, SearchResultRequest } from '../types/jobSearch.type';
import { estypes } from '@elastic/elasticsearch';
import {
  terms,
  term,
  match,
  range,
} from '../elasticSearch/queries.elasticSearch';
import {
  JOBS_INDEX,
  ElasticClient,
} from '../../../../src/clients/elasticsearch.client';
import { v4 } from 'uuid';
import {
  getAggregates,
  transformAggregateResult,
} from '../elasticSearch/aggregates.elasticSearch';

export async function createIndex(): Promise<Response> {
  try {
    // Check if index already exists
    const indexExists = await ElasticClient.getClient().indices.exists({
      index: JOBS_INDEX,
    });

    if (indexExists) {
      console.log(`Index ${JOBS_INDEX} already exists.`);
      return {
        statusCode: 200,
        body: {
          message: 'index already exist',
        },
      };
    }

    // Create the index with mappings
    const response = await ElasticClient.getClient().indices.create({
      index: JOBS_INDEX,
      body: {
        mappings: {
          properties: {
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
    const {
      role = '',
      country = '',
      location = '',
      workTypes = [],
      preferences = [],
      skills = [],
      industries = [],
      description = [],
      minSalary,
      maxSalary,
      minExp,
      maxExp,
      size = 10,
      from = 0,
      aggsOnly = false,
      debug = false,
    } = request;

    let filter: estypes.QueryDslQueryContainer[] = [];
    let query: estypes.QueryDslQueryContainer = {};

    match(filter, 'role', role);
    term(filter, 'country', country);
    term(filter, 'location', location);
    terms(filter, 'workTypes', workTypes);
    terms(filter, 'preferences', preferences);
    terms(filter, 'skills', skills);
    terms(filter, 'industries', industries);
    terms(filter, 'description', description);
    range(filter, 'minExp', 'maxExp', minExp, maxExp);
    range(filter, 'minSalary', 'maxSalary', minSalary, maxSalary);

    if (filter.length > 0) {
      query = {
        bool: {
          filter,
        },
      };
    } else {
      query = {
        match_all: {},
      };
    }

    const result: estypes.SearchResponse =
      await ElasticClient.getClient().search({
        index: JOBS_INDEX,
        body: {
          query,
          size,
          from,
          aggs: getAggregates(),
        },
      });

    const cleanHits: Job[] = result.hits.hits.map((h) => {
      return {
        score: h._score as number,
        id: h._id as string,
        ...(h._source as object),
      };
    });

    const cleanAggregates = transformAggregateResult(
      result.aggregations as Record<string, estypes.AggregationsAggregate>,
    );

    return {
      statusCode: 200,
      body: {
        total: 100,
        size,
        from,
        result: cleanHits,
        aggs: cleanAggregates,
        ...(debug ? { query } : {}),
      },
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
