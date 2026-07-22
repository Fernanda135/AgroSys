'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.removeColumn(
      'Sales',
      'stock_id'
    );

    await queryInterface.removeColumn(
      'Sales',
      'quantity'
    );

    await queryInterface.removeColumn(
      'Sales',
      'unit'
    );

    await queryInterface.removeColumn(
      'Sales',
      'unit_price'
    );

  },


  async down(queryInterface, Sequelize) {

    await queryInterface.addColumn(
      'Sales',
      'stock_id',
      {
        type: Sequelize.INTEGER
      }
    );

    await queryInterface.addColumn(
      'Sales',
      'quantity',
      {
        type: Sequelize.DECIMAL
      }
    );

    await queryInterface.addColumn(
      'Sales',
      'unit',
      {
        type: Sequelize.STRING
      }
    );

    await queryInterface.addColumn(
      'Sales',
      'unit_price',
      {
        type: Sequelize.DECIMAL
      }
    );

  }

};