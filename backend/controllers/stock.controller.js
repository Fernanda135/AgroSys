const db = require('../models');
const AppError = require('../utils/AppError');
const validators = require('../utils/validators');

exports.create = async (req, res, next) => {
    try {
        const { product_name, category, quantity, unit_price, unit } = req.body;

        validators.required(product_name, 'nome do produto');
        validators.positiveNumber(quantity, 'quantidade');
        validators.positiveNumber(unit_price, 'preço unitário');

        const stock = await db.Stock.create({
            user_id: req.user.id,
            product_name: product_name.trim(),
            category: category?.trim() || null,
            quantity: parseInt(quantity),
            unit_price: parseFloat(unit_price),
            unit: unit?.trim() || 'un'
        });

        res.status(201).json({
            success: true,
            message: 'Item cadastrado no estoque com sucesso',
            data: stock
        });

    } catch (error) {
        next(error);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const stocks = await db.Stock.findAll({
            where: { user_id: req.user.id },
            order: [['product_name', 'ASC']]
        });

        const totalValue = stocks.reduce((sum, item) => {
            return sum + (item.quantity * item.unit_price);
        }, 0);

        res.status(200).json({
            success: true,
            message: 'Itens do estoque listados com sucesso',
            data: stocks,
            totalValue
        });

    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { product_name, category, quantity, unit_price, unit } = req.body;

        const stock = await db.Stock.findOne({
            where: { id, user_id: req.user.id }
        });

        if (!stock) {
            throw AppError.notFound('Item não encontrado', { id });
        }

        if (product_name !== undefined) {
            validators.required(product_name, 'nome do produto');
        }

        if (quantity !== undefined) {
            validators.positiveNumber(quantity, 'quantidade');
        }

        if (unit_price !== undefined) {
            validators.positiveNumber(unit_price, 'preço unitário');
        }

        const updateData = {};

        if (product_name !== undefined) updateData.product_name = product_name.trim();
        if (category !== undefined) updateData.category = category?.trim() || null;
        if (quantity !== undefined) updateData.quantity = parseInt(quantity);
        if (unit_price !== undefined) updateData.unit_price = parseFloat(unit_price);
        if (unit !== undefined) updateData.unit = unit?.trim() || 'un';

        await stock.update(updateData);

        res.status(200).json({
            success: true,
            message: 'Item do estoque atualizado com sucesso',
            data: stock
        });

    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const stock = await db.Stock.findOne({
            where: { id, user_id: req.user.id }
        });

        if (!stock) {
            throw AppError.notFound('Item não encontrado', { id });
        }

        await stock.destroy();

        res.status(200).json({
            success: true,
            message: 'Item removido do estoque com sucesso'
        });

    } catch (error) {
        next(error);
    }
};

exports.addQuantity = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        validators.positiveInteger(quantity, 'quantidade');

        const stock = await db.Stock.findOne({
            where: { id, user_id: req.user.id }
        });

        if (!stock) {
            throw AppError.notFound('Item não encontrado', { id });
        }

        await stock.update({
            quantity: stock.quantity + parseInt(quantity)
        });

        res.status(200).json({
            success: true,
            message: 'Quantidade do item atualizada com sucesso',
            data: stock
        });

    } catch (error) {
        next(error);
    }
};

exports.lowStock = async (req, res, next) => {
    try {
        const threshold = parseInt(req.query.threshold) || 10;

        const stocks = await db.Stock.findAll({
            where: {
                user_id: req.user.id,
                quantity: {
                    [db.Sequelize.Op.lt]: threshold
                }
            },
            order: [['quantity', 'ASC']]
        });

        res.status(200).json({
            success: true,
            message: 'Itens com estoque baixo listados com sucesso',
            data: stocks,
            count: stocks.length
        });

    } catch (error) {
        next(error);
    }
};