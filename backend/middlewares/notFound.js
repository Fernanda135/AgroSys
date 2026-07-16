const AppError = require('../utils/AppError');

const notFoundHandler = (req, res, next) => {
    const error = AppError.notFound(
        `Rota não encontrada: ${req.method} ${req.originalUrl || req.url}`
    );
    next(error);
};

module.exports = notFoundHandler;