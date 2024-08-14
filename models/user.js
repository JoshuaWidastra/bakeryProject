'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.UserProfile, { foreignKey: 'userId' });
      User.hasMany(models.Product, { foreignKey: 'userId' });
      User.hasMany(models.Order, { foreignKey: 'userId' });
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
  
  return User;
};
