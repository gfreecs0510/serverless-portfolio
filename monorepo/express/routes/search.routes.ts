import express, { Request } from 'express';
import {
  createIndex,
  createUpdateRecordIndex,
  search,
} from '../../services/jobSearch/src/controllers/jobSearch.controller';
import { factory } from '../../src/common/expressFactory.common';

export const searchRoutes = express.Router();

searchRoutes.post('/createIndex', factory(null, createIndex));
searchRoutes.post(
  '/createUpdateRecordIndex',
  factory((req: Request) => {
    return req.body;
  }, createUpdateRecordIndex),
);

searchRoutes.post(
  '/search',
  factory((req: Request) => {
    return req.body;
  }, search),
);
