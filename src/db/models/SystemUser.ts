// user.model.ts
import { DataTypes, Model } from "sequelize";
import { Database } from "../../config/databaseConfig";
import { SystemUserInsert } from "../../interface/systemuser";
const db = new Database();
const sequelize = db.getSequeelize();


const SystemUser = sequelize.define<Model<SystemUserInsert>>(
  "SystemUser",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "system_user",
  }
);
export default SystemUser;
