export const queryPaths = {
  '/query': {
    post: {
      summary: 'Ask query to doc',
      tags: ['Query'],
      requestBody: {
        $ref: '#/components/requestBodies/askQueryBody',
      },
      responses: {
        200: {
          $ref: '#/components/responses/askQueryRes',
        },
        default: {
          $ref: '#/components/responses/askQueryErrRes',
        },
      },
    },

    get: {
      summary: 'Get quries by docId',
      tags: ['Query'],
      parameters: [
        {
          name: 'docId',
          in: 'query',
          schema: {
            type: 'integer',
          },
          description: 'The ID of the document',
        },
        {
          name: 'skip',
          in: 'query',
          required: true,
          schema: {
            type: 'integer',
            example: 0,
          },
          description: 'The ID of the document',
        },
        {
          name: 'limit',
          in: 'query',
          required: true,
          schema: {
            type: 'integer',
            example: 10,
          },
          description: 'The ID of the document',
        },
      ],
      responses: {
        200: {
          $ref: '#/components/responses/getQueriesRes',
        },
        default: {
          $ref: '#/components/responses/getQueriesErrRes',
        },
      },
    },
  },
};
