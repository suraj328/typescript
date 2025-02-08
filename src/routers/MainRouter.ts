import AbstractRouter from "./AbstractRouter";
import SystemUserRouter from "./SystemUserRouter";
import path from "path";


class MainRouter extends AbstractRouter {
  protected initializeRoutes(): void {
    this.router.get("/", async (req, res) => {
      res.sendFile(path.join(__dirname, "..", "public", "index.html"));
      return;
    });
    this.router.get("/test", async (req, res): Promise<void> => {
      const role = req.userRole;
      res.send("ok");
      return;
    });
    // system user
    this.router.use("/user", SystemUserRouter);


  }
}
export default new MainRouter().router;
