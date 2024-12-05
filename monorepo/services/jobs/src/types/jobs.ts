import { paths, components } from './openapi.type';

export type SearchResultRequest =
  paths['/search']['post']['requestBody']['content']['application/json'] & {
    debug?: boolean;
  };
export type SearchResultResponse =
  paths['/search']['post']['responses']['200']['content']['application/json'];
export type Job = components['schemas']['SearchResultJobRecord'];
export type Aggregates = components['schemas']['Aggregates'];
