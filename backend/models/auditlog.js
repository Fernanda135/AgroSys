'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuditLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AuditLog.init({
    user_id: DataTypes.INTEGER,
    table_name: DataTypes.STRING,
    record_id: DataTypes.INTEGER,
    action: DataTypes.STRING,
    old_values: DataTypes.JSON,
    new_values: DataTypes.JSON,
    ip_address: DataTypes.STRING,
    user_agent: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AuditLog',
  });
  return AuditLog;
};