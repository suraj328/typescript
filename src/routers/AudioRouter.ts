import AbstractRouter from "./AbstractRouter";
import { Request, Response } from "express";

class AudioRouter extends AbstractRouter {
  protected initializeRoutes(): void {
    this.router.get("/audio", this.getAllAudio);
  }

  private getAllAudio(req: Request, res: Response): void {
    res.json({ Audio: ["Audio1", "Audio2"] });
  }
}
export default new AudioRouter().router;
