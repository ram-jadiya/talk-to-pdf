export const requestBodies = {
  SignUpBody: {
    description: 'User creation request body',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            fName: {
              type: 'string',
              example: 'Chandler',
            },
            lName: {
              type: 'string',
              example: 'Bing',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'user1@mailinator.com',
            },
          },
          required: ['fName', 'lName', 'email'],
        },
      },
    },
  },

  GoogleSignUpBody: {
    description: 'Google Sign In / Sign Up request body',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: 'ey----',
            },
          },
          required: ['token'],
        },
      },
    },
  },

  EmailBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'user1@mailinator.com',
            },
          },
          required: ['email'],
        },
      },
    },
  },

  verifySignUpOtpBody: {
    description: 'The length of code must be 6',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'user1@mailinator.com',
            },
            code: {
              description: 'code should be number and length should be 6',
              type: 'string',
              example: '123456',
            },
          },
          required: ['email'],
        },
      },
    },
  },

  verifySignInOtpBody: {
    description: 'The length of code must be 6',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'user1@mailinator.com',
            },
            code: {
              description: 'code should be number and length should be 6',
              type: 'string',
              example: '123456',
            },
          },
          required: ['email'],
        },
      },
    },
  },

  uploadDocBody: {
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            pdf: {
              type: 'string',
              format: 'binary',
              description: 'PDF file to upload',
            },
          },
          required: ['pdf'],
        },
      },
    },
  },

  renameDocument: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              example: 'document 1',
            },
          },
          required: ['title'],
        },
      },
    },
  },

  askQueryBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              example: 'document 1',
            },
            docId: {
              type: 'integer',
              example: 1,
            },
          },
          required: ['query', 'docId'],
        },
      },
    },
  },

  paymentWebhookBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['payment_intent.succeeded', 'payment_intent.payment_failed'],
              example: 'payment_intent.succeeded',
            },
            data: {
              type: 'object',
              properties: {
                object: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      example: 'string_id_example',
                    },
                  },
                  required: ['id'],
                },
              },
              required: ['object'],
            },
          },
          required: ['type', 'data'],
        },
      },
    },
  },
};
