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
        field: 'pk',
        composite: ['username'],
      },
      sk: {
        field: 'sk',
        composite: ['type'],
      },
    },
  },
});

export default User;
