import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AnyZodObject, z } from 'zod';
import { BadRequestException } from '../exceptions/badRequest.exception';

/**
 * @method validate
 * @param {object} schema - zod objects for body, quey and params
 * @returns validation middleware
 * @description Validation middleware creator
 */
export const validate = (schema: {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
}): RequestHandler => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }
      if (schema.query) {
        req.query = await schema.query.parseAsync(req.query);
      }
      if (schema.params) {
        req.params = await schema.params.parseAsync(req.params);
      }
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.errors[0]);
        return next(new BadRequestException(error.errors[0].message));
      }
      return next(new BadRequestException('Invalid data!'));
    }
  };
};
