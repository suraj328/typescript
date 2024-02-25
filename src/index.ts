import express, { Application } from "express";
import dotenv from "dotenv";
import http from "http";
import helmet from "helmet";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
import { Database } from "./config/databaseConfig";
import MainRouter from "./routers/MainRouter";
import { ContextType } from "./interface/graphqlcontext";
const database = new Database();
dotenv.config();
class Server {
  private app: Application;
  private httpServer: http.Server;
  private apolloServer: ApolloServer;
  private graphQlPath: string;
  constructor() {
    this.graphQlPath = "/graphqluser";
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.configuration();
    this.apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }: ExpressContext): ContextType => {
        const authorization = req.headers["authorization"];
        let accessToken = "";
        let refreshToken = "";

        if (authorization && authorization.startsWith("Bearer ")) {
          const token = authorization.split(" ")[1];
          accessToken = token;
        }

        const refreshTokenHeader = req.headers["refresh-token"];
        if (refreshTokenHeader) {
          refreshToken = refreshTokenHeader.toString();
        }

        return { accessToken, refreshToken };
      },
    });
  }
  private configuration() {
    this.app.set("port", process.env.APP_PORT || 4000);
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(MainRouter);
  }
  public async Start() {
    if (await database.connect()) {
      await this.apolloServer.start();
      this.apolloServer.applyMiddleware({
        app: this.app as any,
        path: this.graphQlPath,
      });
      this.httpServer.listen(this.app.get("port"), () => {
        console.log(
          `Server is running on http://localhost:${this.app.get("port")}${
            this.graphQlPath
          }`
        );
      });
    } else {
      console.error("Failed to initialize server");
    }
  }
}
new Server().Start();
