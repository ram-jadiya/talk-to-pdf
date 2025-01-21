export const schemas = {
  BaseResponse: {
    type: 'object',
    properties: {
      statusCode: {
        type: 'integer',
        example: 200,
      },
      hasError: {
        type: 'boolean',
        example: false,
      },
      message: {
        type: 'string',
        example: 'success',
      },
      data: {
        type: 'any',
      },
    },
    required: ['statusCode', 'hasError', 'message'],
  },

  User: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 16,
      },
      email: {
        type: 'string',
        format: 'email',
        example: 'user1@mailinator.com',
      },
      fName: {
        type: 'string',
        example: 'Prince',
      },
      lName: {
        type: 'string',
        example: 'Jadiya',
      },
      avatar: {
        type: ['string', 'null'],
        example: null,
      },
      googleId: {
        type: ['string', 'null'],
        example: null,
      },
      isVerified: {
        type: 'boolean',
        example: false,
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        example: '2024-10-30T08:25:50.028Z',
      },
      lastLogin: {
        type: 'string',
        format: 'date-time',
        example: '2024-10-30T08:25:50.028Z',
      },
    },
    required: ['id', 'email', 'fName', 'lName', 'isVerified', 'createdAt', 'lastLogin'],
  },

  Document: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 16,
      },
      userId: {
        type: 'integer',
        example: 16,
      },
      title: {
        type: 'string',
        example: 'Atomic Habits - James Clear 2018_0',
      },
      pages: {
        type: 'integer',
        example: 20,
      },
      createdAt: {
        type: 'string',
        example: '2024-11-15T04:58:13.878Z',
      },
      pdfS3Key: {
        type: 'string',
        example: '1731646687013-Atomic Habits - James Clear 2018_0 (1).pdf',
      },
    },
    required: ['id', 'userId', 'title', 'pages', 'isVerified', 'createdAt', 'pdfS3Key'],
  },

  Query: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 16,
      },
      docId: {
        type: 'integer',
        example: 16,
      },
      query: {
        type: 'string',
        example: 'Give me summary of book.',
      },
      response: {
        type: 'string',
        example: 'summary of book.',
      },
      createdAt: {
        type: 'string',
        example: '2024-11-15T04:58:13.878Z',
      },
    },
    required: ['id', 'docId', 'query', 'response', 'createdAt'],
  },
};
