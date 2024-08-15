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

  //validation
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "Must be a valid email address." },
        notEmpty: { msg: "Email is required." },
      },
      unique: {
        msg: 'This email is already registered.',
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 100], // minimum 8 char
          msg: "Password must be at least 8 characters long."
        },
        notEmpty: { msg: "Password is required." },
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
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
