import { DataTypes, Model } from "sequelize";
import { Database } from "../../config/databaseConfig";
import SystemRole from "./SystemRole";
import { SystemAccessType } from "../../interface/model/systemaccess";
const db = new Database();
const sequelize = db.getSequeelize();
const SystemAccess = sequelize.define<Model<SystemAccessType>>(
  "system_access",
  {
    systemAccessId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: "system_access_id",
    },
    systemRoleId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "system_role_id",
    },
    activeStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "system_access_active_status",
    },
  },
  {
    tableName: "system_access",
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);
SystemRole.hasMany(SystemAccess, {
  as: "system_access",
  foreignKey: "systemRoleId",
});
SystemAccess.belongsTo(SystemRole, { foreignKey: "systemRoleId" });

export default SystemAccess;
