import { DataTypes, Model } from "sequelize";
import { Database } from "../../config/databaseConfig";
import { SystemUserInsert } from "../../interface/systemuser";
const db = new Database();
const sequelize = db.getSequeelize();

const SystemUser = sequelize.define<Model<SystemUserInsert>>(
  "SystemUser",
  {
    systemUserId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: "system_user_id",
    },
    systemUserName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: false,
      field: "system_user_name",
    },
    systemUserEmail: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "system_user_email",
      unique: false,
    },
    systemUserNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: false,
      field: "system_user_number",
    },
    systemUserAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "system_user_address",
    },
    systemUserPassword: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "system_user_password",
    },
    systemUserImage: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "system_user_image",
    },
    activeStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "active_status",
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_verified",
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_admin",
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
