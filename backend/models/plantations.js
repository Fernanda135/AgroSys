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
    name: DataTypes.STRING,
    culture: DataTypes.STRING,
    plantingDate: DataTypes.DATE,
    harvestDate: DataTypes.DATE,
    isHarvested: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Plantations',
  });
  return Plantations;
};