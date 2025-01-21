import { z } from 'zod';

// Define the validation schema
export const signUpSchema = z.object({
  fName: z
    .string({
      required_error: 'First name is required!', // Error when key is missing
      invalid_type_error: 'First name must be a string', // Error when wrong type
    })
    .min(1, { message: 'First name is required!' }), // Required, non-empty string
  lName: z
    .string({
      required_error: 'Last name is required!',
      invalid_type_error: 'Last name must be a string',
    })
    .min(1, { message: 'Last name is required!' }), // Required, non-empty string
  email: z
    .string({
      required_error: 'Email is required!',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email address!' }), // Required, valid email
});

// Define the verify signUp validation schema
export const signUpVerifySchema = z.object({
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
