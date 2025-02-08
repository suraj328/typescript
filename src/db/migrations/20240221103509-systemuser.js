"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("system_user", {
      systemUserid: {
        type: Sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        field: "system_user_id",
        // autoIncrementIdentity: 5000,
      },
      systemUserName: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
        field: "system_user_name",
      },
      systemUserEmail: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
        field: "system_user_email",
        unique: true,
      },
      systemUserNumber: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        field: "system_user_number",
      },
      systemUserAddress: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        field: "system_user_address",
      },
      systemUserImage: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
        field: "system_user_image",
      },
      systemUserPassword: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        field: "system_user_password",
      },
      activeStatus: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "active_status",
      },
      isAdmin: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_admin",
      },
      isVerified: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_verified",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("system_user");
  },
};
