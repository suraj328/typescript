import { Request, Response } from "express";
import AbstractRouter from "./AbstractRouter";
import path from "path";
import { tokenHelper as authHelper } from "../Helper/TokenHelper";
class MainRouter extends AbstractRouter {
  protected initializeRoutes(): void {
   
    this.router.get("/test", async (req, res) => {
      console.log(
        await authHelper.generateRefreshToken({
          id: 566,
          name: "kontra2",
          year: 20245,
        })
      );
      console.log(
        await authHelper.verifyRefreshToken(
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTY2LCJuYW1lIjoia29udHJhMiIsInllYXIiOjIwMjQ1LCJpYXQiOjE3MDkwMzYyODcsImV4cCI6MTcwOTEyMjY4N30.a4z_VwazySlpSCBRBQOIodjGB0U4xZsKVj0sg6cO35ULFmll4i4PubOvHqzn3Kc9EHcb6wnwEEsJMKOqWO57nhvHDu1ps21teVnpRiQE7FjSaAUv-FnyF0h4ZL3jUreW4zR-aBo8IHyJC5HhYAOPHugqgevSbFQboJSmkzLDRlVBYytnLFO2vFxlWEj7SimmpNPTnP3smIRjKC2BC9KxgQEAdQ22nBoQ2M1vZuREmzqPgo2hs5Qs0ABUY2wPexa3zkk6VrRCf4qdOfW9YcSy7YHdLHOrWXm_gF_ng97jykpSUHv8UL8QowN6ev3_guInjTY8emWcMUEUF8CktUrFaw"
        )
      );
      console.log(
        await authHelper.decodeRefreshToken(
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTY2LCJuYW1lIjoia29udHJhMiIsInllYXIiOjIwMjQ1LCJpYXQiOjE3MDkwMzYyODcsImV4cCI6MTcwOTEyMjY4N30.a4z_VwazySlpSCBRBQOIodjGB0U4xZsKVj0sg6cO35ULFmll4i4PubOvHqzn3Kc9EHcb6wnwEEsJMKOqWO57nhvHDu1ps21teVnpRiQE7FjSaAUv-FnyF0h4ZL3jUreW4zR-aBo8IHyJC5HhYAOPHugqgevSbFQboJSmkzLDRlVBYytnLFO2vFxlWEj7SimmpNPTnP3smIRjKC2BC9KxgQEAdQ22nBoQ2M1vZuREmzqPgo2hs5Qs0ABUY2wPexa3zkk6VrRCf4qdOfW9YcSy7YHdLHOrWXm_gF_ng97jykpSUHv8UL8QowN6ev3_guInjTY8emWcMUEUF8CktUrFaw"
        )
      );
      res.send("hello");
    });
    this.router.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "..", "public", "index.html"));
    });
  }
}
export default new MainRouter().router;
