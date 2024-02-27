import { Request, Response } from "express";
import AbstractRouter from "./AbstractRouter";
import path from "path";
class MainRouter extends AbstractRouter {
  protected initializeRoutes(): void {
    this.router.get("/test", async (req, res) => {
      res.send("hello");
    });
    this.router.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "..", "public", "index.html"));
    });
  }
}
export default new MainRouter().router;
