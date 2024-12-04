import { SearchResultRequest } from '../types/jobs';
import { QueryDslQueryContainer } from '@opensearch-project/opensearch/api/types';

function match(filters: object[], property: string, value: string) {
  if (!value && value.trim() !== '') {
    filters.push({
      match: {
        [property]: value,
      },
    });
  }
}

function range(
  filters: object[],
  fromProperty: string,
  toProperty: string,
  fromValue: any,
  toValue: any,
) {
  if (fromValue !== undefined && toValue !== undefined) {
    filters.push({
      bool: {
        must: [
          {
            range: {
              [fromProperty]: {
                gte: fromValue,
              },
            },
          },
          {
            range: {
              [toProperty]: {
                lte: toValue,
              },
            },
          },
        ],
      },
    });
  }
}

function term(filters: object[], property: string, value: string) {
  if (value !== undefined && value.trim() !== '') {
    filters.push({
      term: {
        [property]: {
          value,
        },
      },
    });
  }
}

function terms(filters: object[], property: string, values: any[]) {
  if (values.length > 0) {
    filters.push({
      terms: {
        [property]: values,
      },
    });
  }
}

export function getFilterQuery(request: SearchResultRequest) {
  const {
    role = '',
    country = '',
    location = '',
    workTypes = [],
    preferences = [],
    skills = [],
    industries = [],
    minSalary,
    maxSalary,
    minExp,
    maxExp,
  } = request;

  let filter: QueryDslQueryContainer[] = [];

  match(filter, 'role', role);
  term(filter, 'country', country);
  term(filter, 'location', location);
  terms(filter, 'workTypes', workTypes);
  terms(filter, 'preferences', preferences);
  terms(filter, 'skills', skills);
  terms(filter, 'industries', industries);
  range(filter, 'minExp', 'maxExp', minExp, maxExp);
  range(filter, 'minSalary', 'maxSalary', minSalary, maxSalary);

  return filter;
}

export function getShouldMatch(
  request: SearchResultRequest,
): QueryDslQueryContainer[] {
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
  } = request;

  let filter: any[] = [];

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

  return [
    {
      dis_max: {
        queries: filter,
      },
    },
  ];
}
