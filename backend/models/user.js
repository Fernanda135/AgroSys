'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.ToDo, {
        foreignKey: 'user_id',
        as: 'todos'
      });

      User.hasMany(models.Stock, {
        foreignKey: 'user_id',
        as: 'stocks'
      });

      User.hasMany(models.Plantations, {
        foreignKey: 'user_id',
        as: 'plantations'
      });

      User.hasMany(models.Finances, {
        foreignKey: 'user_id',
        as: 'finances'
      });

      User.hasMany(models.AuditLog, {
        foreignKey: 'user_id',
        as: 'auditlogs'
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};