const db = require('../models');

// Função auxiliar para criar logs (usada internamente)
exports.createLog = async (data) => {
    try {
        return await db.AuditLog.create({
            user_id: data.user_id,
            table_name: data.table_name,
            record_id: data.record_id,
            action: data.action,
            old_values: data.old_values || null,
            new_values: data.new_values || null,
            ip_address: data.ip_address || null,
            user_agent: data.user_agent || null
        });
    } catch (error) {
        console.error('Erro ao criar log:', error);
    }
};

// Listar todos os logs
exports.findAll = async (req, res) => {
    try {
        const logs = await db.AuditLog.findAll({
            where: { user_id: req.user.id },
            include: [{
                model: db.User,
                as: 'user',
                attributes: ['id', 'name', 'email']
            }],
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json(logs);
    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno: ' + error.message
        });
    }
};

// Buscar um log específico
exports.findOne = async (req, res) => {
    try {
        const { id } = req.params;

        const log = await db.AuditLog.findOne({
            where: {
                id,
                user_id: req.user.id
            },
            include: [{
                model: db.User,
                as: 'user',
                attributes: ['id', 'name', 'email']
            }]
        });

        if (!log) {
            return res.status(404).json({
                message: 'Log não encontrado'
            });
        }

        return res.status(200).json(log);
    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno: ' + error.message
        });
    }
};

// Buscar logs por tabela
exports.findByTable = async (req, res) => {
    try {
        const { table_name } = req.params;

        const logs = await db.AuditLog.findAll({
            where: {
                user_id: req.user.id,
                table_name
            },
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json(logs);
    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno: ' + error.message
        });
    }
};

// Buscar logs por ação
exports.findByAction = async (req, res) => {
    try {
        const { action } = req.params;

        const logs = await db.AuditLog.findAll({
            where: {
                user_id: req.user.id,
                action
            },
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json(logs);
    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno: ' + error.message
        });
    }
};