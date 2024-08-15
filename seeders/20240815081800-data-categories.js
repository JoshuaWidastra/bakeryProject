"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categories", [
      {
        name: "Cookies",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cupcakes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pastry",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
