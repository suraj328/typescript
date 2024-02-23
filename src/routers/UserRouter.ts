import SytsemUserController from "../controller/SystemUserController";
import AbstractRouter from "./AbstractRouter";
import { Request, Response } from "express";
 

class UserRouter extends AbstractRouter {
  protected initializeRoutes(): void {
    this.router.get("/user", new SytsemUserController().findAll);
    this.router.post("/user/add",  new SytsemUserController().add);
  }

  private getAllUsers(req: Request, res: Response): void {
    res.json({ users: ["user1", "user2", "user3"] });
  }
}

export default new UserRouter().router;
