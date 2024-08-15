'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    static associate(models) {
      UserProfile.belongsTo(models.User, { foreignKey: 'userId' });
    }

    // instance method
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }

  UserProfile.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, 
      }
    },
    address: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      validate: {
        is: /^[0-9\-]+$/i, 
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserProfile',
  });

  return UserProfile;
};
