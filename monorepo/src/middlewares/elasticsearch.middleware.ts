import { ElasticClient } from '../clients/elasticsearch.client';

const elasticsearchMiddleware = () => {
  const before = async (request: any) => {
    await ElasticClient.initialize();
  };

  const after = () => {};

  return {
    before,
    after,
  };
};

export { elasticsearchMiddleware };
