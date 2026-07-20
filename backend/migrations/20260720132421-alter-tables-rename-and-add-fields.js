'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // ==================== TABELA PLANTATIONS ====================
      
      // 1. Renomear campos existentes (camelCase para snake_case)
      await queryInterface.renameColumn('Plantations', 'plantingDate', 'planting_date', { transaction });
      await queryInterface.renameColumn('Plantations', 'harvestDate', 'harvest_date', { transaction });
      await queryInterface.renameColumn('Plantations', 'isHarvested', 'is_harvested', { transaction });
      // 'user_id' e 'culture' já estão em snake_case

      // 2. Adicionar novos campos na tabela Plantations
      await queryInterface.addColumn('Plantations', 'variety', {
        type: Sequelize.STRING,
        allowNull: true
      }, { transaction });

      await queryInterface.addColumn('Plantations', 'quantity_planted', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      }, { transaction });

      await queryInterface.addColumn('Plantations', 'unit', {
        type: Sequelize.STRING,
        allowNull: true
      }, { transaction });

      await queryInterface.addColumn('Plantations', 'expected_production', {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0
      }, { transaction });

      await queryInterface.addColumn('Plantations', 'status', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'active'
      }, { transaction });

      await queryInterface.addColumn('Plantations', 'notes', {
        type: Sequelize.TEXT,
        allowNull: true
      }, { transaction });

      // Campos de timestamp (recomendado)
      await queryInterface.addColumn('Plantations', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }, { transaction });

      await queryInterface.addColumn('Plantations', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }, { transaction });

      // ==================== TABELA FINANCES ====================
      
      // 1. Renomear campos existentes (camelCase para snake_case)
      await queryInterface.renameColumn('Finances', 'isIncome', 'is_income', { transaction });
      await queryInterface.renameColumn('Finances', 'transactionDate', 'transaction_date', { transaction });
      // 'user_id', 'description', 'category', 'amount' já estão em snake_case

      // 2. Adicionar campos de timestamp na tabela Finances
      await queryInterface.addColumn('Finances', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }, { transaction });

      await queryInterface.addColumn('Finances', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // ==================== REMOVER CAMPOS DA TABELA PLANTATIONS ====================
      
      // Remover novos campos
      await queryInterface.removeColumn('Plantations', 'variety', { transaction });
      await queryInterface.removeColumn('Plantations', 'quantity_planted', { transaction });
      await queryInterface.removeColumn('Plantations', 'unit', { transaction });
      await queryInterface.removeColumn('Plantations', 'expected_production', { transaction });
      await queryInterface.removeColumn('Plantations', 'status', { transaction });
      await queryInterface.removeColumn('Plantations', 'notes', { transaction });
      await queryInterface.removeColumn('Plantations', 'created_at', { transaction });
      await queryInterface.removeColumn('Plantations', 'updated_at', { transaction });

      // Reverter renomeações (voltar para camelCase)
      await queryInterface.renameColumn('Plantations', 'planting_date', 'plantingDate', { transaction });
      await queryInterface.renameColumn('Plantations', 'harvest_date', 'harvestDate', { transaction });
      await queryInterface.renameColumn('Plantations', 'is_harvested', 'isHarvested', { transaction });

      // ==================== REMOVER CAMPOS DA TABELA FINANCES ====================
      
      await queryInterface.removeColumn('Finances', 'created_at', { transaction });
      await queryInterface.removeColumn('Finances', 'updated_at', { transaction });

      // Reverter renomeações (voltar para camelCase)
      await queryInterface.renameColumn('Finances', 'is_income', 'isIncome', { transaction });
      await queryInterface.renameColumn('Finances', 'transaction_date', 'transactionDate', { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};