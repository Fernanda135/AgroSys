const db = require('../models');
const AppError = require('../utils/AppError');

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

exports.findAll = async (req, res, next) => {
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

        return res.status(200).json({
            success: true,
            data: logs
        });
    } catch (error) {
        next(error);
    }
};

exports.findOne = async (req, res, next) => {
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
            throw AppError.notFound('Log não encontrado', { id });
        }

        return res.status(200).json({
            success: true,
            data: log
        });
    } catch (error) {
        next(error);
    }
};

exports.findByTable = async (req, res, next) => {
    try {
        const { table_name } = req.params;

        const logs = await db.AuditLog.findAll({
            where: {
                user_id: req.user.id,
                table_name
            },
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            success: true,
            data: logs
        });
    } catch (error) {
        next(error);
    }
};

exports.findByAction = async (req, res, next) => {
    try {
        const { action } = req.params;

        const logs = await db.AuditLog.findAll({
            where: {
                user_id: req.user.id,
                action
            },
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            success: true,
            data: logs
        });
    } catch (error) {
        next(error);
    }
};