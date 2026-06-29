const db = require('../models');


exports.create = async (req, res) => {
    try {
        const { product_name, category, quantity, unit_price, unit } = req.body;

        if (!product_name || product_name.trim().length === 0) {
            return res.status(400).json({
                message: 'O nome do produto é obrigatório'
            });
        }

        if (!quantity || quantity < 0) {
            return res.status(400).json({
                message: 'A quantidade deve ser um número positivo'
            });
        }

        if (!unit_price || unit_price < 0) {
            return res.status(400).json({
                message: 'O preço unitário deve ser um valor positivo'
            });
        }

        const stock = await db.Stock.create({
            user_id: req.user.id,
            product_name,
            category,
            quantity,
            unit_price,
            unit
        });

        return res.status(201).json(stock);

    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno do servidor: ' + error.message
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const stocks = await db.Stock.findAll({
            where: {
                user_id: req.user.id,
            }
        });
        return res.status(200).json(stocks);
    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno do servidor: ' + error.message
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const stock = await db.Stock.findOne({
            where: {
                id,
                user_id: req.user.id
            }
        });

        if (!stock) {
            return res.status(404).json({
                message: 'Item não encontrado'
            });
        }

        const updateData = {};

        if (product_name !== undefined) {
            if (!product_name || product_name.trim().length === 0) {
                return res.status(400).json({
                    message: 'O nome do produto não pode ser vazio'
                });
            }
            updateData.product_name = product_name.trim();
        }

        if (category !== undefined) {
            updateData.category = category ? category.trim() : null;
        }

        if (quantity !== undefined) {
            if (quantity < 0) {
                return res.status(400).json({
                    message: 'A quantidade deve ser um número positivo'
                });
            }
            updateData.quantity = parseInt(quantity);
        }

        if (unit_price !== undefined) {
            if (unit_price < 0) {
                return res.status(400).json({
                    message: 'O preço unitário deve ser um valor positivo'
                });
            }
            updateData.unit_price = parseFloat(unit_price);
        }

        await stock.update(req.body);
        return res.status(200).json(stock);
    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno do servidor: ' + error.message
        });
    }

};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const stock = await db.Stock.findOne({
            where: {
                id,
                user_id: req.user.id
            }
        });

        if (!stock) {
            return res.status(404).json({
                message: 'Item não encontrado'
            });
        }

        await stock.destroy();

        return res.status(200).json({
            message: 'Item removido com sucesso'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno do servidor: ' + error.message
        });
    }
};