import { Sequelize, Dialect } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export class Database {
  private sequelize: Sequelize;

  constructor() {
    const dialect: Dialect = process.env.DIALECT as Dialect;
    const dbname: string = process.env.DB_NAME as string;
    const username: string = process.env.DB_USER as string;
    const password: string = process.env.DB_PASS as string;
    const host: string = process.env.DB_HOST as string;

    this.sequelize = new Sequelize(dbname, username, password, {
      host,
      dialect,
      logging: console.log,
      pool: {
        max: parseInt(process.env.DB_MAX_POOL as string, 10) || 5,
        min: parseInt(process.env.DB_MIN_POOL as string, 10) || 0,
        acquire: 30000,
        idle: 10000,
      },
      define: {
        timestamps: true,
      },
    });
  }

  // Check connection
  public async connect(): Promise<boolean> {
    try {
      await this.sequelize.authenticate();
      console.log("Database connection has been established successfully.");
      return true;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      return false;
    }
  }

  public getSequeelize(): Sequelize {
    return this.sequelize;
  }
}