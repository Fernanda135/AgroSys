const db = require("../models");
const AppError = require("../utils/AppError");
const validators = require("../utils/validators");

exports.create = async (req, res, next) => {
    const transaction = await db.sequelize.transaction();
    try {
        const {
            client_name,
            items,
            sale_date,
            payment_method,
            status,
            notes,
        } = req.body;

        validators.required(client_name, "cliente");
        validators.validDate(sale_date, "data da venda");

        if (!Array.isArray(items) || items.length === 0) {
            throw AppError.badRequest(
                "Adicione pelo menos um produto"
            );
        }

        let total_price = 0;

        for (const item of items) {
            validators.positiveNumber(
                item.quantity,
                "quantidade"
            );
            validators.positiveNumber(
                item.unit_price,
                "preço unitário"
            );

            const stock = await db.Stock.findOne({
                where: {
                    id: item.stock_id,
                    user_id: req.user.id,
                },
                transaction,
            });

            if (!stock) {
                throw AppError.notFound(
                    "Produto não encontrado"
                );
            }

            if (
                Number(stock.quantity) <
                Number(item.quantity)
            ) {
                throw AppError.badRequest(
                    `Estoque insuficiente para ${stock.product_name}`
                );
            }

            total_price +=
                Number(item.quantity) *
                Number(item.unit_price);
        }

        const sale = await db.Sales.create(
            {
                user_id: req.user.id,
                client_name: client_name.trim(),
                total_price,
                sale_date,
                payment_method,
                status,
                notes: notes?.trim() || null,
            },
            {
                transaction,
            }
        );

        for (const item of items) {
            await db.SaleItem.create(
                {
                    sale_id: sale.id,
                    stock_id: item.stock_id,
                    quantity: Number(item.quantity),
                    unit: item.unit,
                    unit_price: Number(item.unit_price),
                    total_price:
                        Number(item.quantity) *
                        Number(item.unit_price),
                },
                {
                    transaction,
                }
            );

            const stock = await db.Stock.findByPk(
                item.stock_id,
                {
                    transaction,
                }
            );

            await stock.update(
                {
                    quantity:
                        Number(stock.quantity) -
                        Number(item.quantity),
                },
                {
                    transaction,
                }
            );
        }

        await transaction.commit();

        const saleCreated = await db.Sales.findByPk(
            sale.id,
            {
                include: [
                    {
                        model: db.SaleItem,
                        as: "items",
                        include: [
                            {
                                model: db.Stock,
                                as: "stock",
                                attributes: [
                                    "id",
                                    "product_name",
                                    "unit"
                                ]
                            }
                        ]
                    }
                ]
            }
        );

        res.status(201).json({
            success: true,
            message: "Venda cadastrada com sucesso.",
            data: saleCreated,
        });

    } catch (error) {
        console.error("ERRO AO CRIAR VENDA:");
        console.error(error.message);
        console.error(error.stack);
        await transaction.rollback();
        next(error);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const sales = await db.Sales.findAll({
            where: {
                user_id: req.user.id,
            },
            include: [
                {
                    model: db.SaleItem,
                    as: "items",
                    include: [
                        {
                            model: db.Stock,
                            as: "stock",
                            attributes: [
                                "id",
                                "product_name",
                                "unit"
                            ]
                        }
                    ]
                }
            ],
            order: [
                [
                    "sale_date",
                    "DESC"
                ]
            ]
        });

        const totalSales = sales.reduce(
            (sum, sale) =>
                sum + Number(sale.total_price),
            0
        );

        res.status(200).json({
            success: true,
            message: "Vendas listadas com sucesso.",
            data: sales,
            summary: {
                totalSales,
                totalRecords: sales.length
            }
        });

    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;

        const sale = await db.Sales.findOne({
            where: {
                id,
                user_id: req.user.id
            }
        });

        if (!sale) {
            throw AppError.notFound(
                "Venda não encontrada"
            );
        }

        const updateData = {};

        [
            "client_name",
            "sale_date",
            "payment_method",
            "status",
            "notes"
        ].forEach(field => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        await sale.update(updateData);

        res.status(200).json({
            success: true,
            message: "Venda atualizada com sucesso.",
            data: sale
        });

    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    const transaction =
        await db.sequelize.transaction();

    try {
        const { id } = req.params;

        const sale = await db.Sales.findOne({
            where: {
                id,
                user_id: req.user.id
            },
            include: [
                {
                    model: db.SaleItem,
                    as: "items"
                }
            ],
            transaction
        });

        if (!sale) {
            throw AppError.notFound(
                "Venda não encontrada"
            );
        }

        await sale.destroy({
            transaction
        });

        await transaction.commit();

        res.status(200).json({
            success: true,
            message: "Venda removida com sucesso."
        });

    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};