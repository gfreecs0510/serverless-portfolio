import { Client } from '@opensearch-project/opensearch';

const JOBS_INDEX = 'jobs';

class ElasticClient {
  private static instance: Client | null = null;

  private constructor() {}

  static async initialize(): Promise<any> {
    if (!ElasticClient.instance) {
      console.log('initializeLogs', process.env.ELASTICSEARCH_URL);
      ElasticClient.instance = new Client({
        node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200', // Use environment variable for URL
      });
    }

    return ElasticClient.instance;
  }

  static getClient(): Client {
    if (!ElasticClient.instance) {
      throw new Error(
        'ElasticClient has not been initialized. Call ElasticClient.initialize() first.',
      );
    }
    return ElasticClient.instance;
  }
}

export { JOBS_INDEX, ElasticClient };
