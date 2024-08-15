'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, { foreignKey: 'userId' });
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
      Product.belongsToMany(models.Order, { through: models.OrderItem, foreignKey: 'productId' });
    }
  }

  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING 
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};
