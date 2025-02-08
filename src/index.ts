import express, { Application } from "express";
import dotenv from "dotenv";
import http from "http";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { Database } from "./config/databaseConfig";
import MainRouter from "./routers/MainRouter";
import testFun from "./test";
import path from "path";
import cors from "cors";
import corsOptions from "./config/corsConfig";
import tokenMiddleware from "./middleware/tokenMiddleWare";
import imageCorsMiddleware from "./config/imageCorsMiddleware";
const database = new Database();
dotenv.config();
class Server {
  private app: Application;
  private httpServer: http.Server;
  private graphQlPath: string;
  constructor() {
    this.graphQlPath = "/";
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.configuration();
  }
  private configuration() {
    this.app.set("port", process.env.APP_PORT || 8000);
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.app.use(cors(corsOptions));
    this.app.use(tokenMiddleware);
    this.app.use(
      "/uploads",
      imageCorsMiddleware,
      express.static(path.join(__dirname, "uploads"))
    );
    this.app.use(MainRouter);
  }
  public async Start() {
    if (await database.connect()) {
      this.httpServer.listen(this.app.get("port"), () => {
        console.log(
          `Server is running on http://localhost:${this.app.get("port")}${
            this.graphQlPath
          }`
        );
      });
      testFun();
    } else {
      console.error("Failed to initialize server");
    }
  }
}
new Server().Start();
