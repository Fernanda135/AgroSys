const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw AppError.unauthorized('Token não fornecido');
        }

        let token = authHeader;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            throw AppError.unauthorized('Token não fornecido');
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    throw AppError.unauthorized('Token expirado');
                }
                if (err.name === 'JsonWebTokenError') {
                    throw AppError.unauthorized('Token inválido');
                }
                throw AppError.unauthorized('Erro na autenticação');
            }
            
            req.user = decoded;
            next();
        });

    } catch (error) {
        next(error);
    }
};

const isAdmin = (req, res, next) => {
    if (!req.user) {
        throw AppError.unauthorized('Usuário não autenticado');
    }

    if (req.user.role !== 'admin') {
        throw AppError.forbidden('Acesso negado. Permissão de administrador necessária.');
    }

    next();
};

module.exports = { verifyToken, isAdmin };