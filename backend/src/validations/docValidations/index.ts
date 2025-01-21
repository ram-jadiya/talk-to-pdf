import { z } from 'zod';

// Define the docId validation schema
export const docIdSchema = z.object({
  id: z
    .string()
    .transform((val) => parseInt(val, 10)) // Convert string to integer
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'id must be a positive integer',
    }),
});

// Define the title validation schema
export const renameDocSchema = z.object({
  title: z
    .string({
      required_error: 'title is required!',
      invalid_type_error: 'title be a string',
    })
    .min(1, { message: "Title shouldn't be empty" }), //min length must be 1
});

// Define the search docs validation schema
export const searchDocSchema = z.object({
  search: z
    .string({
      invalid_type_error: 'search be a string',
    })
    .default(''),
  skip: z.string().transform((val) => parseInt(val, 10)), // Convert string to integer
  limit: z.string().transform((val) => parseInt(val, 10)), // Convert string to integer
});
