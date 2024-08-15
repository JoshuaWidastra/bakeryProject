'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      CartItem.belongsTo(models.User, { foreignKey: 'userId' });
      CartItem.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  
  CartItem.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  
  return CartItem;
};
