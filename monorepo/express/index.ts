import express, { Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { searchRoutes } from './routes/search.routes';
import { ElasticClient } from '../src/clients/elasticsearch.client';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

async function bootstrap(): Promise<void> {
  ElasticClient.initialize();
}

bootstrap()
  .then(() => {
    app.use(express.json());
    app.use(helmet());
    app.use(helmet.xssFilter());
    app.use('/jobs', searchRoutes);
    app.listen(port, () => {
      console.log('Express app running in port: ', port);
    });
  })
  .catch((error: unknown) => {
    console.error('An error occurred:', error);
  });
