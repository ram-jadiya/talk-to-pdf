import { Router } from 'express';
import V1Routes from './v1';
import { Route } from '../types';

class Routes implements Route {
  public path: string = '/';
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/v1', new V1Routes().router);
  }
}

export default Routes;
