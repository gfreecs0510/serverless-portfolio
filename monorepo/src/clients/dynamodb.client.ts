import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

type DynamoDBOptions = {
  region: string;
  endpoint?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
};

let options: DynamoDBOptions = {
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const client = new DynamoDBClient(options);
const docClient = DynamoDBDocumentClient.from(client);

export { client, docClient };
