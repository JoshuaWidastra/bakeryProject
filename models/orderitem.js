'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
    }
  }

  OrderItem.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderItem',
  });

  return OrderItem;
};
