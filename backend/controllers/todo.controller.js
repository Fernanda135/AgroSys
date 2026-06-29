const db = require('../models');


exports.create = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || title.trim().length === 0) {
            return res.status(400).json({
                message: 'O título é obrigatório'
            });
        }

        const todo = await db.ToDo.create({
            user_id: req.user.id,
            title,
            description,
            completed: false
        });

        return res.status(201).json(todo);

    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno do servidor: ' + error.message
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const todos = await db.ToDo.findAll({
            where: {
                user_id: req.user.id,
            }
        });
        return res.status(200).json(todos);
    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno do servidor: ' + error.message
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await db.ToDo.findOne({
            where: {
                id,
                user_id: req.user.id
            }
        });

        if (!todo) {
            return res.status(404).json({
                message: 'Tarefa não encontrada'
            });
        }

        await todo.update(req.body);
        return res.status(200).json(todo);
    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno do servidor: ' + error.message
        });
    }

};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await db.ToDo.findOne({
            where: {
                id,
                user_id: req.user.id
            }
        });

        if (!todo) {
            return res.status(404).json({
                message: 'Tarefa não encontrada'
            });
        }

        await todo.destroy();

        return res.status(200).json({
            message: 'Tarefa removida com sucesso'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno do servidor: ' + error.message
        });
    }
};