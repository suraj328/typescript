import { Router } from 'express';

abstract class AbstractRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  protected abstract initializeRoutes(): void;
}
export default AbstractRouter;
