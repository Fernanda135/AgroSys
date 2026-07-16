const AppError = require('../utils/AppError');

const errorHandler = (err, req, res, next) => {
    console.error('ERRO:', {
        message: err.message,
        path: req.path,
        method: req.method,
        user: req.user?.id || 'anonymous',
        timestamp: new Date().toISOString()
    });

    if (process.env.NODE_ENV !== 'production') {
        console.error('STACK:', err.stack);
        console.error('BODY:', req.body);
        console.error('QUERY:', req.query);
        console.error('PARAMS:', req.params);
    }

    let error = err;

    if (err.name && err.name.startsWith('Sequelize')) {
        if (err.name === 'SequelizeValidationError') {
            const messages = err.errors.map(e => e.message);
            error = AppError.validation('Erro de validação', messages);
        } else if (err.name === 'SequelizeUniqueConstraintError') {
            const field = err.errors[0]?.path || 'campo';
            error = AppError.conflict(`${field} já está em uso`);
        } else if (err.name === 'SequelizeForeignKeyConstraintError') {
            error = AppError.badRequest('Registro referenciado não existe');
        } else if (err.name === 'SequelizeConnectionError') {
            error = AppError.internal('Erro de conexão com o banco de dados');
        } else {
            error = AppError.internal('Erro no banco de dados');
        }
    }

    if (err.name === 'JsonWebTokenError') {
        error = AppError.unauthorized('Token inválido');
    }
    if (err.name === 'TokenExpiredError') {
        error = AppError.unauthorized('Token expirado');
    }

    if (!(error instanceof AppError)) {
        error = AppError.internal(
            process.env.NODE_ENV === 'production' 
                ? 'Erro interno do servidor' 
                : err.message
        );
    }

    const response = {
        success: false,
        status: error.statusCode,
        message: error.message,
        timestamp: error.timestamp || new Date().toISOString(),
        path: req.path,
        method: req.method
    };

    if (error.details) {
        response.details = error.details;
    }

    if (error.errorCode) {
        response.errorCode = error.errorCode;
    }

    if (process.env.NODE_ENV !== 'production' && error.stack) {
        response.stack = error.stack;
    }

    res.status(error.statusCode).json(response);
};

module.exports = errorHandler;