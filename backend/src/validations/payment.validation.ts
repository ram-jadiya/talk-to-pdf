import { z } from 'zod';

// Defiend the planId validation schema
export const planIdSchema = z.object({
  planId: z
    .string()
    .transform((val) => parseInt(val, 10)) // Convert string to integer
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'planId must be a positive integer',
    }),
});
