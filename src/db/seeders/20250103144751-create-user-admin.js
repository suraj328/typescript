module.exports = {
  up: async (queryInterface, Sequelize) => {
    const existingUser = await queryInterface.sequelize.query(
      "SELECT * FROM system_user WHERE system_user_email IN ('inerstechwork@gmail.com')",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    await queryInterface.bulkInsert(
      "system_user",
      [
        {
          system_user_password:
            "$2a$10$8Eu6IVco4Pdt3bc/Vn22AOEIKk6PSaaxdPyDP4nQOHXyi3QVQEFDa",
          system_user_name: "Inerstech",
          system_user_email: "inerstechwork@gmail.com",
          system_user_address: "gwarko,lalitpur,ktm",
          system_user_number: 9865079074,
          active_status: true,
          is_admin: true,
          is_verified: true,
        },
      ],
      {
        ignoreDuplicates: true,
        where: {
          system_user_email: {
            [Sequelize.Op.notIn]: existingUser.map(
              (provider) => provider.system_user_email
            ),
          },
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("system_user", null, {});
  },
};
