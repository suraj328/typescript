module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("system_access", {
      systemAccessId: {
        type: Sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        field: "system_access_id",
      },
      systemRoleId: {
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "system_role",
          key: "system_role_id",
        },
        field: "system_role_id",
      },
      activeStatus: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "system_access_active_status",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("system_access");
  },
};
