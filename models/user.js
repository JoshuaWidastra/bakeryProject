'use strict';
const { Model } = require('sequelize');
const { sendWelcomeEmail } = require('../services/mailer');
const { getMostPopularItem } = require('../services/popularity');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.UserProfile, { foreignKey: 'userId' });
      User.hasMany(models.Product, { foreignKey: 'userId' });
      User.hasMany(models.Order, { foreignKey: 'userId' });
    }

    // instance
    async calculateMembershipLevel() {
      const orders = await this.getOrders(); // check getOrders order models
      const totalSpending = orders.reduce((total, order) => total + order.totalAmount, 0);

      if (totalSpending > 1000000) {
        return 'Gold';
      } else if (totalSpending > 500000) {
        return 'Silver';
      } else {
        return 'Bronze';
      }
    }
  }

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  //hook mailer
  User.addHook('afterCreate', (user, options) => {
    sendWelcomeEmail(user.email);
  });

  //hook popular item
  User.addHook('afterFind', async (user, options) => {
    if (user && user.role === 'admin') {
      const popularItem = await getMostPopularItem();
      if (popularItem) {
        user.dataValues.mostPopularItem = popularItem;
      }
    }
  });
  
  return User;
};
