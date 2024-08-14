'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'userId' });
      Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
    }
  }

  Order.init({
    orderDate: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    totalAmount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });

  return Order;
};
