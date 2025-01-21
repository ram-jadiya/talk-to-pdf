import { env } from './configs/env.config';
import compression from 'compression';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cookieParse from 'cookie-parser';
import hpp from 'hpp';
import process from 'node:process';
import { dbPool } from './configs/pgDB.config';

import { errorMiddleware } from './middlewares/error.middleware';
import { Logger } from './configs/logger.config';
import { requestLogger } from './middlewares/requestLogger.middleware';
import { limiter } from './configs/rateLimit.config';
import Routes from './routes';
import { setupSwagger } from './configs/swagger.config';

export class App {
  public app: Application;
  public port: string | number;
  public NODE_ENV: string;
  private server: ReturnType<Application['listen']> | null = null;

  constructor() {
    this.app = express();
    this.port = env.PORT || 3000;
    this.NODE_ENV = env.NODE_ENV || 'development';

    this.setupProcessHandlers();
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.intializeSwaggerDoc();
  }

  public listen() {
    this.server = this.app.listen(this.port, () => {
      console.log(`====== Worker ${process.pid} started =====`);
      console.log(`======= ENV: ${this.NODE_ENV} ========`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });

    // Handle server errors
    this.server.on('error', (error: Error) => {
      console.log(error); // Log error on failure
      Logger.error('Server Initialization error:', error); //cloudlog error
      process.exit(1); // Exit process if connection fails
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    // Connect to the database and log success/failure
    dbPool
      .connect()
      .then(() => {
        console.log(`========================================`);
        console.log(`🎉 Database Connection Successful! 🎉`);
        console.log(`Database: ${env.DB_NAME}`);
        console.log(`Host: ${env.DB_HOST}`);
        console.log(`Port: ${env.DB_PORT}`);
        console.log(`========================================`);
      })
      .catch((e) => {
        console.error(e); // Log error on failure
        Logger.error('Database Connection failed', e); //cloudlog error
        process.exit(1); // Exit process if connection fails
      });
  }

  private initializeMiddlewares() {
    this.app.use(helmet()); //Adds security-related HTTP headers
    this.app.use(cors({ credentials: true, origin: true })); //Enable CORS for handling cross-origin requests
    this.app.use(hpp()); // Prevents HTTP Parameter Pollution attacks
    this.app.use(limiter); // Apply rate limiting to all routes
    this.app.use((req, res, next) => {
      if (!req.originalUrl.includes('/webhook')) {
        express.json()(req, res, next);
      } else {
        next();
      }
    });
    this.app.use(cookieParse()); //Parses cookies in incoming requests
    this.app.use(compression()); //Compress response bodies for better performance
    this.app.use(requestLogger); //Custom middleware for logging requests
  }

  private initializeRoutes() {
    // Health check endpoint
    this.app.get('/health', (_req: Request, res: Response) => {
      res.status(200).json({ status: 'OK' });
    });

    this.app.use('/api', new Routes().router);
  }

  private intializeSwaggerDoc() {
    setupSwagger(this.app);
  }

  private initializeErrorHandling() {
    // Error handling middleware should be the last middleware to be added
    this.app.use(errorMiddleware);
  }

  private setupProcessHandlers(): void {
    // Handle uncaught exceptions
    process.on('uncaughtException', (error: Error) => {
      Logger.error('Uncaught Exception:', error);
      this.shutdown(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason: Error) => {
      Logger.error('Unhandled Rejection:', reason);
      this.shutdown(1);
    });

    // Handle shutdown signals
    process.on('SIGTERM', () => this.shutdown(0));
    process.on('SIGINT', () => this.shutdown(0));
  }

  private shutdown(code: number): void {
    Logger.info('Shutting down application...');

    try {
      // Close server gracefully
      if (this.server) {
        new Promise((resolve) => {
          this.server?.close(resolve);
        }).catch(() => process.exit(1));
      }

      // Close database connections
      if (dbPool) {
        dbPool.end().catch(() => process.exit(1));
      }

      Logger.info('Cleanup completed');
      process.exit(code);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Logger.error('Error during shutdown:', error);
      process.exit(1);
    }
  }
}
