import winston from 'winston';
// import WinstonCloudWatch from 'winston-cloudwatch';
import { env } from './env.config';

interface LoggerConfig {
  region: string;
  logGroupName: string;
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
  environment: string;
}

export class Logger {
  private static instance: winston.Logger;
  // private static cloudWatchTransport: WinstonCloudWatch;

  public static initialize(_config: LoggerConfig) {
    if (this.instance) {
      return this.instance;
    }

    // const cloudWatchConfig = {
    //   logGroupName: config.logGroupName,
    //   logStreamName: `${config.environment}-${new Date().toISOString().split('T')[0]}`,
    //   awsRegion: config.region,
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   messageFormatter: (item: any) => {
    //     return JSON.stringify({
    //       timestamp: new Date().toISOString(),
    //       environment: config.environment,
    //       level: item.level,
    //       message: item.message,
    //       meta: item.meta,
    //     });
    //   },
    // };

    // this.cloudWatchTransport = new WinstonCloudWatch(cloudWatchConfig);

    this.instance = winston.createLogger({
      level: 'info',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
        // this.cloudWatchTransport,
      ],
    });

    return this.instance;
  }

  public static getInstance(): winston.Logger {
    if (!this.instance) {
      throw new Error('Logger not initialized. Call initialize() first.');
    }
    return this.instance;
  }

  public static log(level: string, message: string, meta: object = {}) {
    this.getInstance().log(level, message, { meta });
  }

  public static info(message: string, meta: object = {}) {
    this.getInstance().info(message, { meta });
  }

  public static error(message: string, meta: object = {}) {
    this.getInstance().error(message, { meta });
  }

  public static warn(message: string, meta: object = {}) {
    this.getInstance().warn(message, { meta });
  }

  public static debug(message: string, meta: object = {}) {
    this.getInstance().debug(message, { meta });
  }
}

Logger.initialize({
  region: env.AWS_REGION,
  awsAccessKeyId: env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  environment: env.NODE_ENV,
  logGroupName: env.AWS_LOG_GROUP_NAME,
});
