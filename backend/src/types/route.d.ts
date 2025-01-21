import { Router } from 'express';

export interface Route {
  router: Router;
  path: string;
}
