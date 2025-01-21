export const userPaths = {
  '/auth/google': {
    post: {
      summary: 'User sign up through google login',
      tags: ['Auth'],
      requestBody: {
        $ref: '#/components/requestBodies/GoogleSignUpBody',
      },
      responses: {
        200: {
          $ref: '#/components/responses/GoogleSingUpRes',
        },
        default: {
          $ref: '#/components/responses/GoogleSingUPErrorRes',
        },
      },
    },
  },

  '/auth/signUp': {
    post: {
      summary: 'User sign up',
      tags: ['Auth'],
      requestBody: {
        $ref: '#/components/requestBodies/SignUpBody',
      },
      responses: {
        200: {
          $ref: '#/components/responses/SignUpRes',
        },
        default: {
          $ref: '#/components/responses/SignUpErrRes',
        },
      },
    },
  },

  '/auth/otp/signUp': {
    post: {
      summary: 'Request otp for signup',
      tags: ['Auth'],
      requestBody: {
        $ref: '#/components/requestBodies/EmailBody',
      },
      responses: {
        200: {
          $ref: '#/components/responses/SingUpOtpRes',
        },
        default: {
          $ref: '#/components/responses/SingUpOtpErrRes',
        },
      },
    },
  },

  '/auth/signUp/verify-otp': {
    post: {
      summary: 'Verify signup otp',
      tags: ['Auth'],
      requestBody: {
        $ref: '#/components/requestBodies/verifySignUpOtpBody',
      },
      responses: {
        200: {
          $ref: '#/components/responses/VerifySignUpOtpRes',
        },
        default: {
          $ref: '#/components/responses/VerifySignUpOtpErrRes',
        },
      },
    },
  },

  '/auth/otp/logIn': {
    post: {
      summary: 'Request otp for login',
      tags: ['Auth'],
      requestBody: {
        $ref: '#/components/requestBodies/EmailBody',
      },
      responses: {
        200: {
          $ref: '#/components/responses/SingInOtpRes',
        },
        default: {
          $ref: '#/components/responses/SingInOtpErrRes',
        },
      },
    },
  },

  '/auth/logIn/verify-otp': {
    post: {
      summary: 'Verify signIn otp',
      tags: ['Auth'],
      requestBody: {
        $ref: '#/components/requestBodies/verifySignInOtpBody',
      },
      responses: {
        200: {
          $ref: '#/components/responses/VerifySignInOtpRes',
        },
        default: {
          $ref: '#/components/responses/VerifySignInOtpErrRes',
        },
      },
    },
  },

  '/auth/refresh-token': {
    post: {
      summary: 'refresh access token',
      tags: ['Auth'],
      requestBody: {},
      responses: {
        200: {
          $ref: '#/components/responses/RefereshTokenRes',
        },
        default: {
          $ref: '#/components/responses/RefereshTokenErrRes',
        },
      },
    },
  },

  '/auth/access-token/verify': {
    get: {
      summary: 'verify access-token',
      tags: ['Auth'],
      requestBody: {},
      responses: {
        200: {
          $ref: '#/components/responses/VerifyAccessTokenRes',
        },
        default: {
          $ref: '#/components/responses/VerifyAccessTokenErrRes',
        },
      },
    },
  },

  '/auth/logout': {
    post: {
      summary: 'logout api',
      tags: ['Auth'],
      requestBody: {},
      responses: {
        200: {
          $ref: '#/components/responses/LogOutRes',
        },
      },
    },
  },
};
