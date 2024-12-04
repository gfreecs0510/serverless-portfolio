import { AggregationsAggregate } from '@opensearch-project/opensearch/api/types';

export function getAggregates() {
  const countriesAndLocations = {
    terms: {
      field: 'country',
      size: 300,
    },
    aggs: {
      locations: {
        terms: {
          field: 'location',
          size: 300,
        },
      },
    },
  };

  const preferences = {
    terms: {
      field: 'preferences',
      size: 10,
    },
  };

  const workTypes = {
    terms: {
      field: 'workTypes',
      size: 10,
    },
  };

  const industries = {
    terms: {
      field: 'industries',
      size: 300,
    },
  };

  const salaries = {
    range: {
      field: 'avgSalary',
      ranges: [
        { from: 0, to: 1, key: '<1K USD' },
        { from: 1, to: 3, key: '1-3K USD' },
        { from: 3, to: 5, key: '3-5K USD' },
        { from: 5, to: 8, key: '5-8K USD' },
        { from: 8, to: 100, key: '8K+ USD' },
      ],
    },
  };

  const workExperiences = {
    range: {
      field: 'avgExp',
      ranges: [
        { from: 0, to: 3, key: '< 3 years' },
        { from: 3, to: 6, key: '3 - 6 years' },
        { from: 6, to: 9, key: '6 - 9 years' },
        { from: 9, to: 100, key: '9+ years' },
      ],
    },
  };

  return {
    countriesAndLocations,
    preferences,
    workTypes,
    industries,
    salaries,
    workExperiences,
  };
}

//TODO: this needs to be cleanup, some sort of helper function
export function transformAggregateResult(
  aggregations: Record<string, AggregationsAggregate>,
) {
  const countriesAndLocations = [
    (aggregations['countriesAndLocations'] as any)?.buckets.map((c: any) => {
      return {
        ...c,
        locations: c.locations.buckets,
      };
    }),
  ];

  const preferences = [...(aggregations['preferences'] as any)?.buckets];

  const workTypes = [...(aggregations['workTypes'] as any)?.buckets];

  const industries = [...(aggregations['industries'] as any)?.buckets];

  const workExperiences = [
    ...(aggregations['workExperiences'] as any)?.buckets,
  ];

  const salaries = [...(aggregations['salaries'] as any)?.buckets];
  const cleanAggregates = {
    countriesAndLocations,
    preferences,
    workTypes,
    industries,
    workExperiences,
    salaries,
  };

  return cleanAggregates;
}
