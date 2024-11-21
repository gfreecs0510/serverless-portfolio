import { createSchema } from 'electrodb';

const User = createSchema({
  model: {
    service: 'user',
    entity: 'User',
    version: '1',
  },
  attributes: {
    username: { type: 'string' },
    password: { type: 'string' },
    type: { type: 'string' },
  },
  indexes: {
    user: {
      pk: {
        field: 'PK',
        composite: ['username'],
      },
      sk: {
        field: 'SK',
        composite: ['type'],
      },
    },
  },
});

export default User;
