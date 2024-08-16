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
          "https://images.unsplash.com/photo-1597528673850-e27492b0335f?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoryId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Eclair",
        description:
          "A choux pastry filled with creamy custard or whipped cream, and topped with a rich chocolate or coffee glaze.",
        price: 8000,
        imageUrl:
          "https://images.unsplash.com/photo-1588685723157-4bcbf57fba57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8RWNsYWlyfGVufDB8fDB8fHww",
        categoryId: 3,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Profiterole",
        description:
          "A small, round choux pastry filled with whipped cream, custard, or ice cream, and often topped with chocolate sauce.",
        price: 8000,
        imageUrl:
          "https://images.pexels.com/photos/7646673/pexels-photo-7646673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        categoryId: 3,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Classic Vanilla Cupcake",
        description:
          "A light and fluffy vanilla cupcake topped with a creamy vanilla buttercream frosting. A timeless favorite for any occasion.",
        price: 8000,
        imageUrl:
          "https://images.unsplash.com/photo-1551404973-7dec6ee9bba7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VmFuaWxsYSUyMEN1cGNha2V8ZW58MHx8MHx8fDA%3D",
        categoryId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chocolate Fudge Cupcake",
        description:
          "Rich chocolate cupcake with a gooey fudge center, topped with a velvety chocolate ganache and sprinkles.",
        price: 8000,
        imageUrl:
          "https://images.pexels.com/photos/1026123/pexels-photo-1026123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        categoryId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Red Velvet Cupcake",
        description:
          "Moist and tender red velvet cupcake with a hint of cocoa, topped with a smooth cream cheese frosting and a sprinkle of red velvet crumbs.",
        price: 8000,
        imageUrl:
          "https://images.pexels.com/photos/2525682/pexels-photo-2525682.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        categoryId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Snickerdoodles",
        description:
          "Soft and chewy cookies rolled in a mixture of cinnamon and sugar, with a distinctive tangy flavor from cream of tartar.",
        price: 8000,
        imageUrl:
          "https://plus.unsplash.com/premium_photo-1723651299489-be59274e33d2?q=80&w=910&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoryId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Peanut Butter Cookies",
        description:
          "Rich, nutty cookies made with creamy peanut butter, featuring a crumbly texture and a classic fork mark pattern.",
        price: 8000,
        imageUrl:
          "https://images.unsplash.com/photo-1564988208918-44ed48c1b236?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFBlYW51dCUyMEJ1dHRlciUyMENvb2tpZXN8ZW58MHx8MHx8fDA%3D",
        categoryId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gingerbread Cookies",
        description:
          "Spiced cookies with ginger, cinnamon, and cloves, often shaped into festive figures and decorated with icing.",
        price: 8000,
        imageUrl:
          "https://images.unsplash.com/photo-1616372383709-de2bc15e3dee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEdpbmdlcmJyZWFkJTIwQ29va2llc3xlbnwwfHwwfHx8MA%3D%3D",
        categoryId: 1,
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
