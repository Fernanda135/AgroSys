"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Sales", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      stock_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Stocks",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      client_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      quantity: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      unit: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      unit_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      total_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      sale_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },

      payment_method: {
        type: Sequelize.STRING,
      },

      notes: {
        type: Sequelize.TEXT,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Sales");
  },
};