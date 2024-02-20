import express, { Application, Request, Response } from "express";
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("hello world4");
});

app.listen(8000, () => {
  console.log("port listening on 8000");
});
