import { errosArrayObject } from '../utils';

export const responses = {
  GoogleSingUpRes: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/User',
        },
      },
    },
  },

  GoogleSingUPErrorRes: {
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
        example: errosArrayObject([{ code: 409, msg: 'Invalid Google token!' }]),
      },
    },
  },

  SignUpRes: {
    description: 'Sign up success response',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/User',
        },
      },
    },
  },

  SignUpErrRes: {
    description: 'Conflict error, e.g., if email is already in use',
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
        example: errosArrayObject([{ code: 409, msg: 'Email already exists!' }]),
      },
    },
  },

  SingUpOtpRes: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/User',
        },
      },
    },
  },

  SingUpOtpErrRes: {
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
        example: errosArrayObject([
          { code: 400, msg: 'Email is not exist!' },
          { code: 400, msg: 'Email is already been verified!' },
        ]),
      },
    },
  },

  VerifySignUpOtpRes: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/User',
        },
      },
    },
  },

  VerifySignUpOtpErrRes: {
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
        example: errosArrayObject([
          {
            code: 400,
            msg: 'Email is not exist!',
          },
          {
            code: 400,
            msg: 'Email is already been verified!',
          },
          {
            code: 400,
            msg: 'Invalid otp!',
          },
          {
            code: 400,
            msg: 'otp is expired!',
          },
        ]),
      },
    },
  },

  SingInOtpRes: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/User',
        },
      },
    },
  },

  SingInOtpErrRes: {
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
        example: errosArrayObject([{ code: 400, msg: 'Email is not exist!' }]),
      },
    },
  },

  VerifySignInOtpRes: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/User',
        },
      },
    },
  },

  VerifySignInOtpErrRes: {
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
        example: errosArrayObject([
          {
            code: 400,
            msg: 'Email is not exist!',
          },
          {
            code: 400,
            msg: 'Invalid otp!',
          },
          {
            code: 400,
            msg: 'otp is expired!',
          },
        ]),
      },
    },
  },

  RefereshTokenRes: {
    content: {
      'application/json': {
        schema: {
          type: 'null',
        },
        example: null,
      },
    },
  },

  RefereshTokenErrRes: {
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
        example: errosArrayObject([
          {
            code: 401,
            msg: 'Refresh token not found!',
          },
          {
            code: 401,
            msg: 'Unauthorized!',
          },
        ]),
      },
    },
  },

  VerifyAccessTokenRes: {
    content: {
      'application/json': {
        schema: {
          type: 'null',
        },
        example: null,
      },
    },
  },

  VerifyAccessTokenErrRes: {
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
        example: errosArrayObject([
          {
            code: 401,
            msg: 'Access token not found!',
          },
          {
            code: 401,
            msg: 'Unauthorized!',
          },
        ]),
      },
    },
  },

  LogOutRes: {
    content: {
      'application/json': {
        schema: {
          type: 'null',
        },
        example: null,
      },
    },
  },

  GetPlanRes: {
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                example: 1,
              },
              title: {
                type: 'string',
                example: 'Free',
              },
              desc: {
                type: 'string',
                example: 'For small side projects.',
              },
              price: {
                type: 'number',
                format: 'float',
                example: 0,
              },
              validity: {
                type: 'integer',
                example: 0,
              },
              validityDesc: {
                type: 'string',
                example: 'per month',
              },
              features: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: {
                      type: 'string',
                      example: '5 pages per PDF',
                    },
                    desc: {
                      type: 'string',
                      example: 'The maximum amount of pages per PDF-file.',
                    },
                    isAvailable: {
                      type: 'boolean',
                      example: true,
                    },
                  },
                },
                example: [
                  {
                    title: '5 pages per PDF',
                    desc: 'The maximum amount of pages per PDF-file.',
                    isAvailable: true,
                  },
                  {
                    title: '4MB file size limit',
                    desc: 'The maximum file size of a single PDF file.',
                    isAvailable: true,
                  },
                  {
                    title: 'Mobile-friendly interface',
                    desc: '',
                    isAvailable: true,
                  },
                  {
                    title: 'Higher-quality responses',
                    desc: 'Better algorithmic responses for enhanced content quality',
                    isAvailable: false,
                  },
                  {
                    title: 'Priority support',
                    desc: '',
                    isAvailable: false,
                  },
                ],
              },
            },
            example: {
              id: 1,
              title: 'Free',
              desc: 'For small side projects.',
              price: 0,
              validity: 0,
              validityDesc: 'per month',
              features: [
                {
                  title: '5 pages per PDF',
                  desc: 'The maximum amount of pages per PDF-file.',
                  isAvailable: true,
                },
                {
                  title: '4MB file size limit',
                  desc: 'The maximum file size of a single PDF file.',
                  isAvailable: true,
                },
                {
                  title: 'Mobile-friendly interface',
                  desc: '',
                  isAvailable: true,
                },
                {
                  title: 'Higher-quality responses',
                  desc: 'Better algorithmic responses for enhanced content quality',
                  isAvailable: false,
                },
                {
                  title: 'Priority support',
                  desc: '',
                  isAvailable: false,
                },
              ],
            },
          },
        },
      },
    },
  },

  uploadDocRes: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Document',
        },
      },
    },
  },

  uploadResErrRes: {
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
        example: errosArrayObject([
          {
            code: 401,
            msg: 'Unauthorized!',
          },
          {
            code: 400,
            msg: 'You reached to free limit!',
          },
        ]),
      },
    },
  },

  delDocRes: {
    content: {
      'application/json': {
        schema: {
          type: 'null',
        },
        example: null,
      },
    },
  },

  delDocErrREs: {
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
        example: errosArrayObject([
          {
            code: 401,
            msg: 'Unauthorized!',
          },
        ]),
      },
    },
  },

  renameDocRes: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Document',
        },
      },
    },
  },

  renameDocErrRes: {
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
        example: errosArrayObject([
          {
            code: 401,
            msg: 'Unauthorized!',
          },
        ]),
      },
    },
  },

  getDocsRes: {
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Document',
          },
        },
      },
    },
  },

  getDocsErrRes: {
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
        example: errosArrayObject([
          {
            code: 401,
            msg: 'Unauthorized!',
          },
        ]),
      },
    },
  },

  askQueryRes: {
    content: {
      'text/plain': {
        schema: {
          type: 'string',
          example: 'Response of query for doc.',
        },
      },
    },
  },

  askQueryErrRes: {
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
        example: errosArrayObject([
          {
            code: 401,
            msg: 'Unauthorized!',
          },
          {
            code: 404,
            msg: 'Document not found!',
          },
        ]),
      },
    },
  },

  getQueriesRes: {
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Query',
          },
        },
      },
    },
  },

  getQueriesErrRes: {
    content: {
      'application/json': {
        schema: {
          type: 'string',
        },
        example: errosArrayObject([
          {
            code: 401,
            msg: 'Unauthorized!',
          },
        ]),
      },
    },
  },

  paymentWebhookRes: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            received: {
              type: 'boolean',
              example: true,
            },
          },
        },
      },
    },
  },
};
