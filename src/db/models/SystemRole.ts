import { DataTypes, Model } from "sequelize";
import { Database } from "../../config/databaseConfig";
import { SystemRoleType } from "../../interface/model/systemrole";
const db = new Database();
const sequelize = db.getSequeelize();
const SystemRole = sequelize.define<Model<SystemRoleType>>(
  "system_role",
  {
    systemRoleId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: "system_role_id",
    },
    systemRoleName: {
      type: DataTypes.STRING(100),
      unique: true,
      field: "system_role_name",
    },
    activeStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "system_role_active_status",
    },
  },
  {
    tableName: "system_role",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

export default SystemRole;
