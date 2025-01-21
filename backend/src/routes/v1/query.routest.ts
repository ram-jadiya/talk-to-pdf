import { Router } from 'express';
import { Route } from '../../types';
import { QueryController } from '../../controllers/query.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validation.middleware';
import { queryQuriesSchema } from '../../validations/queryValidations';

class QueryRoutes implements Route {
  public router = Router();
  public path = '/query';
  private queryController: QueryController;

  constructor() {
    this.queryController = QueryController.getInstance();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(authMiddleware);

    this.router.post('/', this.queryController.queryDocument);
    this.router.get(
      '/',
      validate({
        query: queryQuriesSchema,
      }),
      this.queryController.queryQueries
    );
  }
}

export default QueryRoutes;
