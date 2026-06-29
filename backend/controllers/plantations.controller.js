const db = require('../models');

exports.create = async (req, res) => {
    try {
        const { name, culture, plantingDate, harvestDate } = req.body;

        if (!name || name.trim().length === 0) {
            return res.status(400).json({
                message: 'O nome da plantação é obrigatório'
            });
        }


        const plantation = await db.Plantations.create({
            user_id: req.user.id,
            name,
            culture,
            plantingDate,
            harvestDate,
            isHarvested: false
        });

        return res.status(201).json(plantation);

    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno do servidor: ' + error.message
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const plantations = await db.Plantations.findAll({
            where: {
                user_id: req.user.id,
            },
        });
        return res.status(200).json(plantations);
    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno do servidor: ' + error.message
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, culture, plantingDate, harvestDate } = req.body;

        const plantation = await db.Plantations.findOne({
            where: {
                id,
                user_id: req.user.id
            }
        });

        if (!plantation) {
            return res.status(404).json({
                message: 'Plantação não encontrada'
            });
        }

        const updateData = {};

        if (name !== undefined) {
            if (!name || name.trim().length === 0) {
                return res.status(400).json({
                    message: 'O nome da plantação não pode ser vazio'
                });
            }
            updateData.name = name.trim();
        }

        if (culture !== undefined) {
            updateData.culture = culture || null;
        }

        if (plantingDate !== undefined) {
            updateData.plantingDate = plantingDate || null;
        }

        if (harvestDate !== undefined) {
            updateData.harvestDate = harvestDate || null;
        }

        await plantation.update(updateData);
        return res.status(200).json(plantation);

    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno do servidor: ' + error.message
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        
        const plantation = await db.Plantations.findOne({
            where: {
                id,
                user_id: req.user.id
            }
        });

        if (!plantation) {
            return res.status(404).json({
                message: 'Plantação não encontrada'
            });
        }

        await plantation.destroy();

        return res.status(200).json({
            message: 'Plantação removida com sucesso'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno do servidor: ' + error.message
        });
    }
};