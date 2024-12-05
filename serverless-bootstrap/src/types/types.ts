import { paths } from './openapi.type';
import { components } from './openapi.type';

export type SearchJobRequestType =
  paths['/search']['post']['requestBody']['content']['application/json'];

export type SearchJobResponseType =
  paths['/search']['post']['responses']['200']['content']['application/json'];

export type Aggregates = components['schemas']['Aggregates'];
export type SearchResultJobRecord =
  components['schemas']['SearchResultJobRecord'];
