import { z } from 'zod';

// Define the query quries validation schema
export const queryQuriesSchema = z.object({
  docId: z
    .string({
      required_error: 'docId is required!',
      invalid_type_error: 'docId must be a string',
    })
    .transform((val) => parseInt(val, 10)), // Convert string to integer
  skip: z
    .string({
      required_error: 'skip is required!',
      invalid_type_error: 'skip must be a string',
    })
    .transform((val) => parseInt(val, 10)), // Convert string to integer
  limit: z
    .string({
      required_error: 'limit is required!',
      invalid_type_error: 'limit must be a string',
    })
    .transform((val) => parseInt(val, 10)), // Convert string to integer
});
