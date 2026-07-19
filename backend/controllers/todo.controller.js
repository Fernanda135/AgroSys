const db = require("../models");
const AppError = require("../utils/AppError");
const validators = require("../utils/validators");

exports.create = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        validators.required(title, "título");
        validators.lengthBetween(title, "título", 3, 255);

        const todo = await db.ToDo.create({
            user_id: req.user.id,
            title: title.trim(),
            description: description?.trim() || null,
            completed: false,
        });

        res.status(201).json({
            success: true,
            message: "Tarefa criada com sucesso",
            data: todo,
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
            where.completed = completed === "true";
        }

        if (search) {
            where.title = { [db.Sequelize.Op.like]: `%${search}%` };
        }

        const todos = await db.ToDo.findAll({
            where,
            order: [["createdAt", "DESC"]],
        });

        const total = todos.length;
        const completedCount = todos.filter((t) => t.completed).length;
        const pendingCount = total - completedCount;

        res.status(200).json({
            success: true,
            message: "Tarefas listadas com sucesso",
            data: todos,
            stats: {
                total,
                completed: completedCount,
                pending: pendingCount,
            },
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
                user_id: req.user.id,
            },
        });

        if (!todo) {
            throw AppError.notFound("Tarefa não encontrada", { id });
        }

        res.status(200).json({
            success: true,
            message: "Tarefa encontrada com sucesso",
            data: todo,
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
            where: { id, user_id: req.user.id },
        });

        if (!todo) {
            throw AppError.notFound("Tarefa não encontrada", { id });
        }

        if (title !== undefined) {
            validators.required(title, "título");
            validators.lengthBetween(title, "título", 3, 255);
        }

        if (completed !== undefined) {
            validators.validBoolean(completed, "status");
        }

        const updateData = {};

        if (title !== undefined) updateData.title = title.trim();
        if (description !== undefined)
            updateData.description = description?.trim() || null;
        if (completed !== undefined) updateData.completed = completed;

        await todo.update(updateData);

        res.status(200).json({
            success: true,
            message: "Tarefa atualizada com sucesso",
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const todo = await db.ToDo.findOne({
            where: { id, user_id: req.user.id },
        });

        if (!todo) {
            throw AppError.notFound("Tarefa não encontrada", { id });
        }

        await todo.destroy();

        res.status(200).json({
            success: true,
            message: "Tarefa removida com sucesso",
        });
    } catch (error) {
        next(error);
    }
};

exports.toggleStatus = async (req, res, next) => {
    try {
        const { id } = req.params;

        const todo = await db.ToDo.findOne({
            where: { id, user_id: req.user.id },
        });

        if (!todo) {
            throw AppError.notFound("Tarefa não encontrada", { id });
        }

        await todo.update({
            completed: !todo.completed,
        });

        res.status(200).json({
            success: true,
            message: "Status da tarefa alterado com sucesso",
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};

exports.completeAll = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const pendingTodos = await db.ToDo.findAll({
            where: {
                user_id: userId,
                completed: false,
            },
        });

        if (pendingTodos.length === 0) {
            return res.status(200).json({
                success: true,
                message: "Não há tarefas pendentes para concluir",
                count: 0,
            });
        }

        const [updatedCount] = await db.ToDo.update(
            { completed: true },
            {
                where: {
                    user_id: userId,
                    completed: false,
                },
            },
        );

        res.status(200).json({
            success: true,
            message: `${updatedCount} tarefa(s) concluída(s) com sucesso`,
            count: updatedCount,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteCompleted = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const completedTodos = await db.ToDo.findAll({
            where: {
                user_id: userId,
                completed: true,
            },
        });

        if (completedTodos.length === 0) {
            return res.status(200).json({
                success: true,
                message: "Não há tarefas concluídas para excluir",
                count: 0,
            });
        }

        const deletedCount = await db.ToDo.destroy({
            where: {
                user_id: userId,
                completed: true,
            },
        });

        res.status(200).json({
            success: true,
            message: `${deletedCount} tarefa(s) excluída(s) com sucesso`,
            count: deletedCount,
        });
    } catch (error) {
        next(error);
    }
};
