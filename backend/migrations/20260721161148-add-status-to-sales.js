"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Sales", "status", {
      type: Sequelize.ENUM("PENDENTE", "PAGO", "CANCELADO"),
      allowNull: false,
      defaultValue: "PAGO",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("Sales", "status");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Sales_status";');
  },
};