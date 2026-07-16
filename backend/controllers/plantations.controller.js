const db = require('../models');
const AppError = require('../utils/AppError');
const validators = require('../utils/validators');

exports.create = async (req, res, next) => {
    try {
        const { culture, plantingDate, harvestDate } = req.body;

        validators.required(culture, 'cultura');
        validators.validDate(plantingDate, 'data de plantio');
        validators.validDate(harvestDate, 'data de colheita');

        if (plantingDate && harvestDate) {
            const plant = new Date(plantingDate);
            const harvest = new Date(harvestDate);
            if (harvest < plant) {
                throw AppError.validation('Data de colheita deve ser após a data de plantio', [
                    { field: 'harvestDate', message: 'Data de colheita deve ser após o plantio' }
                ]);
            }
        }

        const plantation = await db.Plantations.create({
            user_id: req.user.id,
            culture: culture.trim(),
            plantingDate: plantingDate || null,
            harvestDate: harvestDate || null,
            isHarvested: false
        });

        res.status(201).json({
            success: true,
            data: plantation
        });

    } catch (error) {
        next(error);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const plantations = await db.Plantations.findAll({
            where: { user_id: req.user.id },
            order: [['plantingDate', 'DESC']]
        });

        const total = plantations.length;
        const active = plantations.filter(p => !p.isHarvested).length;
        const harvested = plantations.filter(p => p.isHarvested).length;

        res.status(200).json({
            success: true,
            data: plantations,
            stats: { total, active, harvested }
        });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { culture, plantingDate, harvestDate, isHarvested } = req.body;

        const plantation = await db.Plantations.findOne({
            where: { id, user_id: req.user.id }
        });

        if (!plantation) {
            throw AppError.notFound('Plantação não encontrada', { id });
        }

        if (culture !== undefined) {
            validators.required(culture, 'cultura');
        }
        if (plantingDate !== undefined) {
            validators.validDate(plantingDate, 'data de plantio');
        }
        if (harvestDate !== undefined) {
            validators.validDate(harvestDate, 'data de colheita');
        }
        if (isHarvested !== undefined) {
            validators.validBoolean(isHarvested, 'status de colheita');
        }

        const finalPlantingDate = plantingDate || plantation.plantingDate;
        const finalHarvestDate = harvestDate || plantation.harvestDate;
        if (finalPlantingDate && finalHarvestDate) {
            const plant = new Date(finalPlantingDate);
            const harvest = new Date(finalHarvestDate);
            if (harvest < plant) {
                throw AppError.validation('Data de colheita deve ser após a data de plantio', [
                    { field: 'harvestDate', message: 'Data de colheita deve ser após o plantio' }
                ]);
            }
        }

        const updateData = {};
        if (culture !== undefined) updateData.culture = culture.trim();
        if (plantingDate !== undefined) updateData.plantingDate = plantingDate;
        if (harvestDate !== undefined) updateData.harvestDate = harvestDate;
        if (isHarvested !== undefined) updateData.isHarvested = isHarvested;

        await plantation.update(updateData);

        res.status(200).json({
            success: true,
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
            where: { id, user_id: req.user.id }
        });

        if (!plantation) {
            throw AppError.notFound('Plantação não encontrada', { id });
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