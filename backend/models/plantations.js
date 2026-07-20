'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plantations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Plantations.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }
  Plantations.init({
    user_id: DataTypes.INTEGER,
    culture: DataTypes.STRING,
    planting_date: DataTypes.DATE,
    harvest_date: DataTypes.DATE,
    is_harvested: DataTypes.BOOLEAN,
    variety: DataTypes.STRING,
    quantity_planted: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    unit: DataTypes.STRING,
    expected_production: DataTypes.DECIMAL(10, 2),
    status: {
      type: DataTypes.STRING,
      defaultValue: 'PLANTED'
    },
    notes: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Plantations',
  });
  return Plantations;
};