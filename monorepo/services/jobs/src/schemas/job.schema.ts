export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    role: {
      type: 'string',
      description: 'Job Role/Title',
      minLength: 1,
      maxLength: 30,
    },
    company: {
      type: 'string',
      description: 'Name of the company',
      minLength: 1,
      maxLength: 30,
    },
    country: {
      type: 'string',
      description: 'Which country the job is located',
      minLength: 1,
      maxLength: 40,
    },
    location: {
      type: 'string',
      description: 'Which city/state/etc the job is located',
      minLength: 1,
      maxLength: 40,
    },
    preferences: {
      type: 'array',
      description: 'Remote, Hybrid or On-site',
      items: {
        type: 'string',
        enum: ['Remote', 'Hybrid', 'On-site'],
      },
      minItems: 1,
    },
    workTypes: {
      type: 'array',
      description: 'Full-time, Part-time, Contractual',
      items: {
        type: 'string',
        enum: ['Full-time', 'Part-time', 'Contractual'],
      },
      minItems: 1,
    },
    skills: {
      type: 'array',
      description: 'Relevant skills needed for the job',
      items: {
        type: 'string',
        minLength: 1,
        maxLength: 30,
      },
      minItems: 1,
    },
    industries: {
      type: 'array',
      description: 'Industries you will work with',
      items: {
        type: 'string',
        minLength: 1,
        maxLength: 30,
      },
      minItems: 1,
    },
    description: {
      type: 'string',
      description: 'Paragraph description about the job',
      minLength: 1,
      maxLength: 1000,
    },
    minSalary: {
      type: 'number',
      description: 'Minimum salary (in USD, monthly, in thousands) 1 = 1K USD',
      minimum: 0,
      maximum: 100,
    },
    maxSalary: {
      type: 'number',
      description: 'Maximum salary (in USD, monthly, in thousands) 1 = 1K USD',
      minimum: 1,
      maximum: 100,
    },
    minExp: {
      type: 'number',
      description: 'Minimum years of experience required for the job',
      minimum: 0,
      maximum: 100,
    },
    maxExp: {
      type: 'number',
      description: 'Maximum years of experience required for the job',
      minimum: 1,
      maximum: 101,
    },
  },
  required: [
    'role',
    'company',
    'country',
    'location',
    'preferences',
    'workTypes',
    'skills',
    'industries',
    'description',
    'minSalary',
    'maxSalary',
    'minExp',
    'maxExp',
  ],
  additionalProperties: false,
  allOf: [
    {
      if: {
        properties: {
          minSalary: { type: 'number' },
          maxSalary: { type: 'number' },
        },
        required: ['minSalary', 'maxSalary'],
      },
      then: {
        properties: {
          minSalary: {
            type: 'number',
            exclusiveMaximum: { $data: '1/maxSalary' },
          },
        },
      },
    },
    {
      if: {
        properties: {
          minExp: { type: 'number' },
          maxExp: { type: 'number' },
        },
        required: ['minExp', 'maxExp'],
      },
      then: {
        properties: {
          minExp: { type: 'number', exclusiveMaximum: { $data: '1/maxExp' } },
        },
      },
    },
  ],
};
