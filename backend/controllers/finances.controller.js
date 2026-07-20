const db = require('../models');
const AppError = require('../utils/AppError');
const validators = require('../utils/validators');

exports.create = async (req, res, next) => {
    try {
        const { isIncome, description, amount, transaction_date, category } = req.body;

        validators.required(description, 'descrição');
        validators.positiveNumber(amount, 'valor');
        validators.validBoolean(isIncome, 'tipo (receita/despesa)');
        validators.validDate(transaction_date, 'data da transação');

        const finance = await db.Finances.create({
            user_id: req.user.id,
            isIncome: isIncome || false,
            description: description.trim(),
            amount: parseFloat(amount),
            category: category?.trim() || null,
            transaction_date: transaction_date || new Date()
        });

        res.status(201).json({
            success: true,
            message: 'Transação cadastrada com sucesso',
            data: finance
        });

    } catch (error) {
        next(error);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const finances = await db.Finances.findAll({
            where: { user_id: req.user.id },
            order: [['transaction_date', 'DESC']]
        });

        const totalIncome = finances
            .filter(f => f.isIncome)
            .reduce((sum, f) => sum + parseFloat(f.amount), 0);

        const totalExpense = finances
            .filter(f => !f.isIncome)
            .reduce((sum, f) => sum + parseFloat(f.amount), 0);

        res.status(200).json({
            success: true,
            message: 'Transações listadas com sucesso',
            data: finances,
            summary: {
                totalIncome,
                totalExpense,
                balance: totalIncome - totalExpense
            }
        });

    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { isIncome, description, amount, transaction_date, category } = req.body;

        const finance = await db.Finances.findOne({
            where: { id, user_id: req.user.id }
        });

        if (!finance) {
            throw AppError.notFound('Transação não encontrada', { id });
        }

        if (description !== undefined) {
            validators.required(description, 'descrição');
        }

        if (amount !== undefined) {
            validators.positiveNumber(amount, 'valor');
        }

        if (isIncome !== undefined) {
            validators.validBoolean(isIncome, 'tipo');
        }

        if (transaction_date !== undefined) {
            validators.validDate(transaction_date, 'data da transação');
        }

        const updateData = {};

        if (isIncome !== undefined) updateData.isIncome = isIncome;
        if (description !== undefined) updateData.description = description.trim();
        if (amount !== undefined) updateData.amount = parseFloat(amount);
        if (category !== undefined) updateData.category = category?.trim() || null;
        if (transaction_date !== undefined) updateData.transaction_date = transaction_date;

        await finance.update(updateData);

        res.status(200).json({
            success: true,
            message: 'Transação atualizada com sucesso',
            data: finance
        });

    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const finance = await db.Finances.findOne({
            where: { id, user_id: req.user.id }
        });

        if (!finance) {
            throw AppError.notFound('Transação não encontrada', { id });
        }

        await finance.destroy();

        res.status(200).json({
            success: true,
            message: 'Transação removida com sucesso'
        });

    } catch (error) {
        next(error);
    }
};