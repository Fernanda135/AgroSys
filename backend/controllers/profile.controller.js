const db = require('../models');
const AppError = require('../utils/AppError');

exports.fetchUserData = async (req, res, next) => {
    try {
        const user = await db.User.findOne({
            where: { id: req.user.id },
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            throw AppError.notFound('Usuário não encontrado');
        }

        res.status(200).json({
            success: true,
            message: 'Dados do usuário obtidos com sucesso',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        const user = await db.User.findByPk(req.user.id);

        if (!user) {
            throw AppError.notFound('Usuário não encontrado');
        }

        if (name && name.trim().length === 0) {
            throw AppError.validation('Nome não pode ser vazio', [
                {
                    field: 'name',
                    message: 'Nome não pode ser vazio'
                }
            ]);
        }

        if (email) {
            const existingUser = await db.User.findOne({
                where: { email: email.toLowerCase().trim() }
            });

            if (existingUser && existingUser.id !== req.user.id) {
                throw AppError.conflict('Email já está em uso', {
                    field: 'email'
                });
            }
        }

        const updateData = {};

        if (name) updateData.name = name.trim();
        if (email) updateData.email = email.toLowerCase().trim();

        await user.update(updateData);

        user.password = undefined;

        res.status(200).json({
            success: true,
            message: 'Perfil atualizado com sucesso',
            data: user
        });

    } catch (error) {
        next(error);
    }
};