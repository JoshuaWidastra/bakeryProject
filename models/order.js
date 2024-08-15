'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'userId' });
      Order.belongsToMany(models.Product, { through: models.OrderItem, foreignKey: 'orderId' });
    }

    // instance total price before discount
    async calculateTotalPrice() {
      const orderItems = await this.getOrderItems();
      return orderItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    }

    // instance discount
    async calculateDiscount() {
      const { User } = require('../models'); 
      
      const user = await this.getUser();
      const membershipLevel = await user.calculateMembershipLevel();
      const totalPrice = await this.calculateTotalPrice();

      let discount = 0;

      if (membershipLevel === 'Gold' && totalPrice > 500000) {
        discount = totalPrice * 0.15; // 15% discount for Gold members 
      } else if (membershipLevel === 'Silver' && totalPrice > 300000) {
        discount = totalPrice * 0.10; // 10% discount for Silver members 
      } else if (membershipLevel === 'Bronze' && totalPrice > 100000) {
        discount = totalPrice * 0.05; // 5% discount for Bronze members 
      }

      return discount;
    }

    // instance price after discount
    async calculateFinalPrice() {
      const totalPrice = await this.calculateTotalPrice();
      const discount = await this.calculateDiscount();
      return totalPrice - discount;
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
