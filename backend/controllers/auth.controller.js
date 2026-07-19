const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const { createToken, verifyExpiration } = db.authToken;

exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || name.trim().length === 0) {
            throw AppError.validation('Nome é obrigatório', [
                { field: 'name', message: 'Nome é obrigatório' }
            ]);
        }

        if (!email) {
            throw AppError.validation('Email é obrigatório', [
                { field: 'email', message: 'Email é obrigatório' }
            ]);
        }

        if (!password || password.length < 6) {
            throw AppError.validation('Senha deve ter pelo menos 6 caracteres', [
                { field: 'password', message: 'Senha deve ter pelo menos 6 caracteres' }
            ]);
        }

        const userExists = await db.User.findOne({ where: { email } });

        if (userExists) {
            throw AppError.conflict('Email já está associado a uma conta', {
                field: 'email'
            });
        }

        const user = await db.User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: await bcrypt.hash(password, 10)
        });

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION || '1d' }
        );

        const refreshToken = await createToken(user);

        res.status(201).json({
            success: true,
            message: 'Usuário registrado com sucesso',
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                accessToken: token,
                refreshToken
            }
        });

    } catch (error) {
        next(error);
    }
};

exports.signInUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw AppError.validation('Email é obrigatório', [
                { field: 'email', message: 'Email é obrigatório' }
            ]);
        }

        if (!password) {
            throw AppError.validation('Senha é obrigatória', [
                { field: 'password', message: 'Senha é obrigatória' }
            ]);
        }

        const user = await db.User.findOne({
            where: { email: email.toLowerCase().trim() }
        });

        if (!user) {
            throw AppError.unauthorized('Email ou senha incorretos');
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            throw AppError.unauthorized('Email ou senha incorretos');
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION || '1d' }
        );

        const refreshToken = await createToken(user);

        res.status(200).json({
            success: true,
            message: 'Login realizado com sucesso',
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                accessToken: token,
                refreshToken
            }
        });

    } catch (error) {
        next(error);
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const { refreshToken: requestToken } = req.body;

        if (!requestToken) {
            throw AppError.badRequest('Refresh token é obrigatório');
        }

        const refreshToken = await db.authToken.findOne({
            where: { token: requestToken }
        });

        if (!refreshToken) {
            throw AppError.unauthorized('Refresh token inválido');
        }

        if (verifyExpiration(refreshToken)) {
            await db.authToken.destroy({
                where: { id: refreshToken.id }
            });

            throw AppError.unauthorized(
                'Refresh token expirado. Faça login novamente'
            );
        }

        const user = await db.User.findOne({
            where: { id: refreshToken.user },
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            throw AppError.unauthorized('Usuário não encontrado');
        }

        const newAccessToken = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION || '1d' }
        );

        res.status(200).json({
            success: true,
            message: 'Token atualizado com sucesso',
            data: {
                accessToken: newAccessToken,
                refreshToken: refreshToken.token
            }
        });

    } catch (error) {
        next(error);
    }
};