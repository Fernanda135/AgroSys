const db = require('../models');
const finances = require('../models/finances');

exports.create = async (req, res) => {
    try {
        const { isIncome, description, amount, transactionDate } = req.body;

        if (!description || description.trim().length === 0) {
            return res.status(400).json({
                message: 'A descrição é obrigatória'
            });
        }

        if (!amount || amount < 0) {
            return res.status(400).json({
                message: 'O valor deve ser maior que zero'
            });
        }

        const finances = await db.Finances.create({
            user_id: req.user.id,
            isIncome,
            description,
            amount,
            transactionDate,
        });

        return res.status(201).json(finances);

    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno do servidor: ' + error.message
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const finances = await db.Finances.findAll({
            where: {
                user_id: req.user.id,
            },
        });
        return res.status(200).json(finances);
    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno do servidor: ' + error.message
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { isIncome, description, amount, transactionDate } = req.body;

        const finance = await db.Finances.findOne({
            where: {
                id,
                user_id: req.user.id
            }
        });

        if (!finance) {
            return res.status(404).json({
                message: 'Transação não encontrada'
            });
        }

        const updateData = {};

        if (isIncome !== undefined) {
            updateData.isIncome = isIncome;
        }

        if (description !== undefined) {
            if (!description || description.trim().length === 0) {
                return res.status(400).json({
                    message: 'A descrição não pode ser vazia'
                });
            }
            updateData.description = description.trim();
        }

        if (amount !== undefined) {
            updateData.amount = amount || null;
        }

        if (transactionDate !== undefined) {
            updateData.transactionDate = transactionDate || null;
        }

        await finance.update(updateData);
        return res.status(200).json(finance);

    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno do servidor: ' + error.message
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const finance = await db.Finances.findOne({
            where: {
                id,
                user_id: req.user.id
            }
        });

        if (!finance) {
            return res.status(404).json({
                message: 'Transação não encontrada'
            });
        }

        await finance.destroy();

        return res.status(200).json({
            message: 'Transação removida com sucesso'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno do servidor: ' + error.message
        });
    }
};