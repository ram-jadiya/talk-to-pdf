import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/http.exception';
import { statusCode } from '../constants/statuscode.constant';
import { Logger } from '../configs/logger.config';

// Error handling middleware for Express
export const errorMiddleware: ErrorRequestHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Determine the status code and message to return
    const status: number = error.status || statusCode.INTERNAL_SERVER_ERROR;
    const message: string = error.message || 'Something went wrong';

    // Log the error details for debugging purposes
    Logger.error(message, {
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name,
      },
      request: {
        method: req.method,
        path: req.path,
        query: req.query,
        body: req.body,
        ip: req.ip,
      },
    });

    // Send the error response to the client
    res.status(status).json({
      statusCode: status,
      hasError: true,
      message,
      data: null,
      // stack: error.stack || 'something went wrong', // Uncomment to include stack trace
    });
  } catch (error) {
    next(error); // Passes any errors to the next middleware
  }
};
