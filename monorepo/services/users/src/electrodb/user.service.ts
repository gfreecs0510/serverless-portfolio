import { Entity, EntityConfiguration, Service } from 'electrodb';
import { client } from '../../../../src/clients/dynamodb.client';
import User from './schemas/user.schema';

const table = process.env.TABLE_NAME;

console.log('the table', table);

const sharedEntityOptions: EntityConfiguration = {
  table,
  client,
};

export const userService = new Service(
  {
    user: new Entity(User, sharedEntityOptions),
  },
  {
    table,
    client,
  },
);

export default userService;
