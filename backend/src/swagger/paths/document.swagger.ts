export const documentPaths = {
  '/document/upload': {
    post: {
      summary: 'Upload a Doc file',
      tags: ['Document'],
      requestBody: {
        $ref: '#/components/requestBodies/uploadDocBody',
      },
      responses: {
        200: {
          $ref: '#/components/responses/uploadDocRes',
        },
        default: {
          $ref: '#/components/responses/uploadResErrRes',
        },
      },
    },
  },

  '/document/{documentId}': {
    delete: {
      summary: 'Delete document',
      tags: ['Document'],
      parameters: [
        {
          name: 'documentId',
          in: 'path',
          required: true,
          schema: {
            type: 'integer',
            example: 1,
          },
          description: 'The ID of the document',
        },
      ],
      responses: {
        200: {
          $ref: '#/components/responses/delDocRes',
        },
        default: {
          $ref: '#/components/responses/delDocErrREs',
        },
      },
    },
  },

  '/document/{documentId}/rename': {
    patch: {
      summary: 'Rename document',
      tags: ['Document'],
      parameters: [
        {
          name: 'documentId',
          in: 'path',
          required: true,
          schema: {
            type: 'integer',
            example: 1,
          },
          description: 'The ID of the document',
        },
      ],
      requestBody: {
        $ref: '#/components/requestBodies/renameDocument',
      },
      responses: {
        200: {
          $ref: '#/components/responses/renameDocRes',
        },
        default: {
          $ref: '#/components/responses/renameDocErrRes',
        },
      },
    },
  },

  '/document': {
    get: {
      summary: 'Get document list',
      tags: ['Document'],
      parameters: [
        {
          name: 'search',
          in: 'query',
          schema: {
            type: 'string',
            example: 'abc',
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
          $ref: '#/components/responses/getDocsRes',
        },
        default: {
          $ref: '#/components/responses/getDocsErrRes',
        },
      },
    },
  },
};
