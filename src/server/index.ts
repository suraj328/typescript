// app.ts
import express, { Request, Response } from 'express';
import router from './controller/controller';
import { BaseEntity, DataSource } from 'typeorm';
import { People } from './entity/People';

const app = express();
const port = 8000;
app.use(express.json());
app.use(router);

export class AppEntity extends BaseEntity {}
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "society",
  entities:[People],
  "synchronize": true,
  "logging": true
})



AppDataSource.initialize()
  .then(() => {
      console.log("Data Source has been initialized!")
      app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
      });
  })
  .catch((err) => {
      console.error("Error during Data Source initialization\r\nfailed to start server", err);
  })

