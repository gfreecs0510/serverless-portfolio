import express, { Request } from 'express';
import {
  createIndex,
  createUpdateRecordIndex,
  search,
} from '../../services/jobs/src/controllers/jobSearch.controller';
import { factory } from '../../src/common/expressFactory.common';

export const jobsRoutes = express.Router();

jobsRoutes.post('/createIndex', factory(null, createIndex));
jobsRoutes.post(
  '/createUpdateRecordIndex',
  factory((req: Request) => {
    return req.body;
  }, createUpdateRecordIndex),
);

jobsRoutes.post(
  '/search',
  factory((req: Request) => {
    return req.body;
  }, search),
);
