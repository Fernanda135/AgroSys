'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SaleItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SaleItem.belongsTo(models.Sales, {
        foreignKey: "sale_id",
        as: "sale",
      });

      SaleItem.belongsTo(models.Stock, {
        foreignKey: "stock_id",
        as: "stock",
      });

    }
  }
  SaleItem.init({
    sale_id: DataTypes.INTEGER,
    stock_id: DataTypes.INTEGER,
    quantity: DataTypes.DECIMAL,
    unit: DataTypes.STRING,
    unit_price: DataTypes.DECIMAL,
    total_price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'SaleItem',
  });
  return SaleItem;
};