import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";
import helmet from "helmet";
import { Database } from "./config/databaseConfig";
import MainRouter from "./routers/MainRouter";
const database = new Database();
dotenv.config();
class Server {
  private app: Application;
  private httpServer: http.Server;
  constructor() {
    this.app = express();
    this.httpServer = new http.Server(this.app);
    this.configuration();
  }
  private configuration() {
    this.app.set("port", process.env.APP_PORT);
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(MainRouter);
  }
  public async Start() {
    if (await database.connect()) {
      this.httpServer.listen(this.app.get("port"));
      console.log(`server is running ${this.app.get("port")}`);
    } else {
      console.log("failed to initialize server");
    }
  }
}
new Server().Start();
