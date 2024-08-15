"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Products", [
      {
        name: "Whole Wheat Bread",
        description: "Healthy and delicious whole wheat bread",
        price: 5000,
        imageUrl:
          "https://images.pexels.com/photos/1586947/pexels-photo-1586947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        categoryId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chocolate Croissant",
        description: "Flaky pastry with rich chocolate filling",
        price: 7000,
        imageUrl:
          "https://images.pexels.com/photos/1586947/pexels-photo-1586947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        categoryId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Products", null, {});
  },
};
