import { Request, Response } from "express";
import AbstractRouter from "./AbstractRouter";
import path from "path";
import { authHelper } from "../Helper/AuthHelper";
class MainRouter extends AbstractRouter {
  protected initializeRoutes(): void {
    this.router.get("/", (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "..", "public", "index.html"));
    });
    this.router.get("/test", async (req, res) => {
      console.log(
        await authHelper.signAccessToken({ id: "1", name: "kontra", year: 2024 })
      );
      console.log(
        await authHelper.verifyToken(
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoia29udHJhIiwiaWF0IjoxNzA4OTgyNjk5LCJleHAiOjE3NDk1MzgyNTR9.Xpr6LA2CUwbdh6kFGCBMricSLQRNhieGhcXxAd9C8gw7svAIP926oSg_LfEvhV92ONfXw0djhUC5zcnIjYWRDVHHiy2miOcN4JzG0tbBzTn5iWVboi2FvGgc09R03sYfe7akPA-i78ZfbM2bo21bOLCALSMRC_kPUky6QQkq3Y_J8efzSlIoHIZ3WKGN0XDs4e6woJij_VBFgrkzUxj05_UbWliMR95HaDYtT974Tfe7eEe6zvd8J_kkchiyq6Ql1ZXqsY5_iEFEXIAE24uQPhEOrvIaKSNeqLh3E8bn7pMe_XUuPougERNbXH8WJAzqg8I07UFt0DWyKAnhUrqMrQ"
        )
      );
      console.log(
        await authHelper.decodeToken(
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoia29udHJhIiwieWVhciI6MjAyNCwiaWF0IjoxNzA4OTgzMjYwLCJleHAiOjE3MDg5ODM4NjB9.RCt1kAXrSwnNy2gMuip4ikQsmEKS5y5cKmmDO8FNSmiTqoa_jP0YnDM9Ga2y3ASv1G43vj29pmQsRoc47ibQbIfPutjTuIL5Z4DECXxIX58hwP5AJrbmXQAMLG_z14HqvEQdnP0YcOYQuqyJJu7sBgwOnOpafCK1vwCCI1-CzoSJsj4wg50j6z6BGzuH7ug8k4mAezzTKAeKcDq-YPziAin-224RUCT1ZzSqiofn8VpkK3Qi_IaO0RUDPPoCeaezjaV2K_iSNxHH3GCQXlyFutoT1HAgyqh3UYJXHn06G01on-w1XQlxJUmf6Cc7rc4GMRpMhz6Onp1LEprprj9O_Q"
        )
      );
      // await authHelper.getdecoded();
      res.send("hello");
    });
  }
}
export default new MainRouter().router;
