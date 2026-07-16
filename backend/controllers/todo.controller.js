const db = require('../models');
const AppError = require('../utils/AppError');
const validators = require('../utils/validators');


exports.create = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        validators.required(title, 'título');
        validators.lengthBetween(title, 'título', 3, 255);

        const todo = await db.ToDo.create({
            user_id: req.user.id,
            title: title.trim(),
            description: description?.trim() || null,
            completed: false
        });

        res.status(201).json({
            success: true,
            data: todo
        });

    } catch (error) {
        next(error);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const { completed, search } = req.query;
        const where = { user_id: req.user.id };

        if (completed !== undefined) {
            where.completed = completed === 'true';
        }

        if (search) {
            where.title = { [db.Sequelize.Op.like]: `%${search}%` };
        }

        const todos = await db.ToDo.findAll({
            where,
            order: [['createdAt', 'DESC']]
        });

        const total = todos.length;
        const completedCount = todos.filter(t => t.completed).length;
        const pendingCount = total - completedCount;

        res.status(200).json({
            success: true,
            data: todos,
            stats: { total, completed: completedCount, pending: pendingCount }
        });
    } catch (error) {
        next(error);
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const { id } = req.params;

        const todo = await db.ToDo.findOne({
            where: {
                id,
                user_id: req.user.id
            }
        });

        if (!todo) {
            throw AppError.notFound('Tarefa não encontrada', { id });
        }

        res.status(200).json({
            success: true,
            data: todo
        });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        const todo = await db.ToDo.findOne({
            where: { id, user_id: req.user.id }
        });

        if (!todo) {
            throw AppError.notFound('Tarefa não encontrada', { id });
        }

        if (title !== undefined) {
            validators.required(title, 'título');
            validators.lengthBetween(title, 'título', 3, 255);
        }
        if (completed !== undefined) {
            validators.validBoolean(completed, 'status');
        }

        const updateData = {};
        if (title !== undefined) updateData.title = title.trim();
        if (description !== undefined) updateData.description = description?.trim() || null;
        if (completed !== undefined) updateData.completed = completed;

        await todo.update(updateData);

        res.status(200).json({
            success: true,
            data: todo
        });

    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const todo = await db.ToDo.findOne({
            where: { id, user_id: req.user.id }
        });

        if (!todo) {
            throw AppError.notFound('Tarefa não encontrada', { id });
        }

        await todo.destroy();

        res.status(200).json({
            success: true,
            message: 'Tarefa removida com sucesso'
        });

    } catch (error) {
        next(error);
    }
};

exports.toggleStatus = async (req, res, next) => {
    try {
        const { id } = req.params;

        const todo = await db.ToDo.findOne({
            where: { id, user_id: req.user.id }
        });

        if (!todo) {
            throw AppError.notFound('Tarefa não encontrada', { id });
        }

        await todo.update({ completed: !todo.completed });

        res.status(200).json({
            success: true,
            data: todo
        });

    } catch (error) {
        next(error);
    }
};