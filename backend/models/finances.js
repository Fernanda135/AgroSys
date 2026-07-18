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
      Finances.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }
  Finances.init({
    user_id: DataTypes.INTEGER,
    isIncome: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amount: DataTypes.DECIMAL,
    transactionDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Finances',
  });
  return Finances;
};