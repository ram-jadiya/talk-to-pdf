export const paymentPaths = {
  '/payment/plan': {
    get: {
      summary: 'get all the plans',
      tags: ['Payment'],
      requestBody: {},

      responses: {
        200: {
          $ref: '#/components/responses/GetPlanRes',
        },
      },
    },
  },

  '/payment/create-checkout-session': {
    get: {
      summary: 'create payment intent',
      tags: ['Payment'],
      requestBody: {},
      parameters: [
        {
          name: 'planId',
          in: 'query',
          required: true,
          schema: {
            type: 'integer',
            example: 1,
          },
          description: 'The ID of the plan',
        },
      ],
      responses: {
        200: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  sessionUrl: {
                    type: 'string',
                    example:
                      'https://checkout.stripe.com/c/pay/cs_test_a12yICkzsdf9R4gToXEGSm2ThJCClxpEe8IJePCo037c9zUMBmrkP3dIydRez#fidkdWxOYHwnPyd1blpxYHZxWjA0VGxSQ25WQ3J0V3RDRGJhfFJPQzNXPUl2YUdyQDFhdlBKaDc3aUlfV25IT3NJbzFCTnBXVUFjS25GfUZpTW5VfWdXQDJkTENucF03QGRhaGB2a0h%2FNmRRNTVLN1FLXW5tSCcpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl',
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  '/payment/webhook': {
    post: {
      summary: 'payment webhook',
      tags: ['Payment'],
      requestBody: {
        $ref: '#/components/requestBodies/paymentWebhookBody',
      },
      responses: {
        200: {
          $ref: '#/components/responses/paymentWebhookRes',
        },
      },
    },
  },
};
