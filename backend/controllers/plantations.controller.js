const db = require('../models');
const AppError = require('../utils/AppError');
const validators = require('../utils/validators');

exports.create = async (req, res, next) => {
    try {
        const {
            culture,
            planting_date,
            harvest_date,
            variety,
            quantity_planted,
            unit,
            expected_production,
            notes
        } = req.body;

        validators.required(culture, 'cultura');
        validators.validDate(planting_date, 'data de plantio');

        if (harvest_date) {
            validators.validDate(harvest_date, 'data de colheita');
        }

        if (planting_date && harvest_date) {
            const plant = new Date(planting_date);
            const harvest = new Date(harvest_date);

            if (harvest < plant) {
                throw AppError.validation(
                    'Data de colheita deve ser após a data de plantio',
                    [
                        {
                            field: 'harvest_date',
                            message: 'Data de colheita deve ser após o plantio'
                        }
                    ]
                );
            }
        }

        const plantation = await db.Plantations.create({
            user_id: req.user.id,
            culture: culture.trim(),
            planting_date,
            harvest_date: harvest_date || null,
            is_harvested: false,
            variety: variety || null,
            quantity_planted: quantity_planted || 1,
            unit: unit || null,
            expected_production: expected_production || null,
            status: 'PLANTED',
            notes: notes || null
        });

        res.status(201).json({
            success: true,
            message: 'Plantação cadastrada com sucesso',
            data: plantation
        });

    } catch (error) {
        next(error);
    }
};


exports.findAll = async (req, res, next) => {
    try {
        const plantations = await db.Plantations.findAll({
            where: {
                user_id: req.user.id
            },
            order: [
                ['planting_date', 'DESC']
            ]
        });

        const total = plantations.length;

        const active = plantations.filter(
            p => p.status !== 'HARVESTED'
        ).length;

        const harvested = plantations.filter(
            p => p.status === 'HARVESTED'
        ).length;


        res.status(200).json({
            success: true,
            message: 'Plantações listadas com sucesso',
            data: plantations,
            stats: {
                total,
                active,
                harvested
            }
        });

    } catch (error) {
        next(error);
    }
};


exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            culture,
            planting_date,
            harvest_date,
            variety,
            quantity_planted,
            unit,
            expected_production,
            status,
            notes
        } = req.body;


        const plantation = await db.Plantations.findOne({
            where: {
                id,
                user_id: req.user.id
            }
        });


        if (!plantation) {
            throw AppError.notFound(
                'Plantação não encontrada',
                { id }
            );
        }


        if (culture !== undefined) {
            validators.required(culture, 'cultura');
        }


        if (planting_date !== undefined) {
            validators.validDate(
                planting_date,
                'data de plantio'
            );
        }


        if (harvest_date !== undefined && harvest_date) {
            validators.validDate(
                harvest_date,
                'data de colheita'
            );
        }


        const finalPlantingDate =
            planting_date ?? plantation.planting_date;

        const finalHarvestDate =
            harvest_date ?? plantation.harvest_date;


        if (finalPlantingDate && finalHarvestDate) {
            if (
                new Date(finalHarvestDate) <
                new Date(finalPlantingDate)
            ) {
                throw AppError.validation(
                    'Data de colheita deve ser após a data de plantio',
                    [
                        {
                            field: 'harvest_date',
                            message: 'Data inválida'
                        }
                    ]
                );
            }
        }


        const updateData = {};


        if (culture !== undefined)
            updateData.culture = culture.trim();

        if (planting_date !== undefined)
            updateData.planting_date = planting_date;

        if (harvest_date !== undefined)
            updateData.harvest_date = harvest_date;

        if (variety !== undefined)
            updateData.variety = variety;

        if (quantity_planted !== undefined)
            updateData.quantity_planted = quantity_planted;

        if (unit !== undefined)
            updateData.unit = unit;

        if (expected_production !== undefined)
            updateData.expected_production = expected_production;

        if (status !== undefined)
            updateData.status = status;

        if (notes !== undefined)
            updateData.notes = notes;


        await plantation.update(updateData);


        res.status(200).json({
            success: true,
            message: 'Plantação atualizada com sucesso',
            data: plantation
        });


    } catch (error) {
        next(error);
    }
};


exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;


        const plantation = await db.Plantations.findOne({
            where: {
                id,
                user_id: req.user.id
            }
        });


        if (!plantation) {
            throw AppError.notFound(
                'Plantação não encontrada',
                { id }
            );
        }


        await plantation.destroy();


        res.status(200).json({
            success: true,
            message: 'Plantação removida com sucesso'
        });


    } catch (error) {
        next(error);
    }
};


exports.harvest = async (req, res, next) => {
    try {
        const { id } = req.params;


        const plantation = await db.Plantations.findOne({
            where: {
                id,
                user_id: req.user.id
            }
        });


        if (!plantation) {
            throw AppError.notFound(
                'Plantação não encontrada',
                { id }
            );
        }


        if (plantation.status === 'HARVESTED') {
            throw AppError.badRequest(
                'Esta plantação já foi colhida.'
            );
        }


        await plantation.update({
            status: 'HARVESTED',
            is_harvested: true,
            harvest_date: new Date()
        });


        res.status(200).json({
            success: true,
            message: 'Plantação colhida com sucesso.',
            data: plantation
        });


    } catch (error) {
        next(error);
    }
};