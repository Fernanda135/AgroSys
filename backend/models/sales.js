'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sales.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      Sales.hasMany(models.SaleItem, {
        foreignKey: "sale_id",
        as: "items",
      });
    }
  }
  Sales.init({
    user_id: DataTypes.INTEGER,
    client_name: DataTypes.STRING,
    total_price: DataTypes.DECIMAL,
    sale_date: DataTypes.DATE,
    payment_method: DataTypes.STRING,
    notes: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM("PENDENTE", "PAGO", "CANCELADO"),
      allowNull: false,
      defaultValue: "PAGO",
    },
  }, {
    sequelize,
    modelName: 'Sales',
  });
  return Sales;
};