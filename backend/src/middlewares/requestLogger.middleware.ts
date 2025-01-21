import { Request, Response, NextFunction } from 'express';
import { Logger } from '../configs/logger.config';
import { env } from '../configs/env.config';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = new Date();

  // Log request
  Logger.info('Incoming Request', {
    method: req.method,
    path: req.path,
    query: req.query,
    headers: req.headers,
    body: req.body,
    ip: req.ip,
  });

  if (env.NODE_ENV != 'production') {
    // Override res.json to log response
    const originalJson = res.json;
    res.json = function (body) {
      const endTime = new Date();
      const duration = endTime.getTime() - startTime.getTime();

      Logger.info('Outgoing Response', {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        body: body,
      });

      return originalJson.call(this, body);
    };
  }

  next(); // Passes any errors to the next middleware
};
