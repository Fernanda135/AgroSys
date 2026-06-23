'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Finances extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Finances.init({
    user_id: DataTypes.INTEGER,
    isIncome: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    transactionDate: DataTypes.DATE,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Finances',
  });
  return Finances;
};