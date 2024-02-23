import sequelize, { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
export class Database {
  private sequelize: sequelize.Sequelize;
  private dialect: sequelize.Dialect;
  private dbname: string;
  private username: string;
  private password: string;
  private host: string;
  private port: number;
  private maxPool: number;
  private minPool: number;
  constructor() {
    this.dialect = "postgres";
    this.dbname = process.env.DB_NAME as string;
    this.username = process.env.DB_USER as string;
    this.password = process.env.DB_PASS as string;
    this.host = process.env.DB_HOST as string;
    this.port = parseInt(process.env.DB_PORT as string);
    this.maxPool = parseInt(process.env.DB_MAX_POOL as string);
    this.minPool = parseInt(process.env.DB_MIN_POOL as string);
    this.sequelize = new sequelize.Sequelize(
      this.dbname,
      this.username,
      this.password,
      {
        host: this.host,
        dialect: this.dialect,
        dialectOptions: {
          encrypt: true,
        },
        port: this.port,
        logging: false,
        pool: {
          max: this.maxPool,
          min: this.minPool,
          acquire: 30000,
          idle: 10000,
        },
        define: {
          timestamps: true,
          createdAt: true,
          updatedAt: true,
        },
      }
    );
  }
  // check connection
  public async connect(): Promise<boolean> {
    try {
      await this.sequelize.authenticate();
      console.log("Database connection has been established successfully.");
      return true;
    } catch (error: any) {
      console.error("Unable to connect to the database:", error);
      return false;
    }
  }
  public getSequeelize(): Sequelize {
    return this.sequelize;
  }
}

