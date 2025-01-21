import { z } from 'zod';

// Define the validation schema
export const emailSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required!',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email address!' }), // Required, valid email
});

// Define the verify Login validation schema
export const logInVerifySchema = z.object({
  email: z
    .string({
      required_error: 'Email is required!',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email address!' }), // Required, valid email
  code: z
    .string({
      required_error: 'Otp code is required!',
      invalid_type_error: 'Otp code must be a string',
    })
    .length(6, { message: 'Length must be six!' }), // length must be 6
});
