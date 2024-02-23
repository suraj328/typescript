import { Request, Response } from "express";
import AbstractRouter from "./AbstractRouter";
import AudioRouter from "./AudioRouter";
import UserRouter from "./UserRouter";
import path from "path";
class MainRouter extends AbstractRouter {
  protected initializeRoutes(): void {
    this.router.get("/", (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "..", "public", "index.html"));
    });
    this.router.use(UserRouter);
    this.router.use(AudioRouter);
  }
}
export default new MainRouter().router;
