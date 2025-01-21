import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../types/user';
import { QueryService } from '../services/query.service';
import { responseHandler } from '../utils/response.util';
import { QueryQueries } from '../types/query';

/**
 * @class QueryController
 * @description Handles HTTP requests and responses
 */
export class QueryController {
  private static instance: QueryController;
  private queryService: QueryService;

  private constructor() {
    this.queryService = QueryService.getInstance();
  }

  /**
   * @method getInstance
   * @descriptionHandle Get QueryController instance
   */
  public static getInstance(): QueryController {
    if (!QueryController.instance) {
      QueryController.instance = new QueryController();
    }
    return QueryController.instance;
  }

  /**
   * @method queryDocument
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Next middleware function
   * @descriptionHandle Ask query to document and stream the response.
   */
  public queryDocument = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { query, docId } = req.body;
      const userId = req.user!.id;

      await this.queryService.queryDoc(docId, userId, query, res);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @method queryQueries
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Next middleware function
   * @descriptionHandle get the query list with pagination
   */
  public queryQueries = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const query = req.query as unknown as QueryQueries;

      const queriList = await this.queryService.getQueryQueryList(query);

      res.status(200).json(responseHandler(queriList));
    } catch (error) {
      next(error);
    }
  };
}
