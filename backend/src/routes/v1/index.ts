import { Router } from 'express';
import { Route } from '../../types';
import AuthRoutes from './auth.routes';
import PaymentRoutes from './payment.routes';
import DocumentRoutes from './document.routes';
import QueryRoutes from './query.routest';

class V1Routes implements Route {
  public router = Router();
  public path = '/v1';
  private authRoutes: AuthRoutes;
  private paymentRoutes: PaymentRoutes;
  private documentRoutes: DocumentRoutes;
  private queryRoutes: QueryRoutes;

  constructor() {
    this.authRoutes = new AuthRoutes();
    this.paymentRoutes = new PaymentRoutes();
    this.documentRoutes = new DocumentRoutes();
    this.queryRoutes = new QueryRoutes();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(this.authRoutes.path, this.authRoutes.router);
    this.router.use(this.paymentRoutes.path, this.paymentRoutes.router);
    this.router.use(this.documentRoutes.path, this.documentRoutes.router);
    this.router.use(this.queryRoutes.path, this.queryRoutes.router);
  }
}

export default V1Routes;
