let Client; // Declare a variable for the client

const JOBS_INDEX = 'jobs';

class ElasticClient {
  private static instance: any | null = null;

  private constructor() {}

  static async initialize(): Promise<any> {
    if (!ElasticClient.instance) {
      console.log('initializeLogs', process.env.ELASTICSEARCH_URL);

      // Dynamically import the appropriate client based on environment
      if (process.env.AWS_LAMBDA_FUNCTION_NAME) {
        // Running in Lambda, use OpenSearch client
        const { Client: OpenSearchClient } = await import(
          '@opensearch-project/opensearch'
        );
        Client = OpenSearchClient;
      } else {
        // Running in Express, use Elasticsearch client
        const { Client: ElasticSearchClient } = await import(
          '@elastic/elasticsearch'
        );
        Client = ElasticSearchClient;
      }

      ElasticClient.instance = new Client({
        node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200', // Use environment variable for URL
      });
    }

    return ElasticClient.instance;
  }

  static getClient(): any {
    if (!ElasticClient.instance) {
      throw new Error(
        'ElasticClient has not been initialized. Call ElasticClient.initialize() first.',
      );
    }
    return ElasticClient.instance;
  }
}

export { JOBS_INDEX, ElasticClient };
