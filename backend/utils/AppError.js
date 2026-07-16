class AppError extends Error {
    constructor(message, statusCode, errorCode = null, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.details = details;
        this.isOperational = true;
        this.timestamp = new Date().toISOString();
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message = 'Requisição inválida', details = null) {
        return new AppError(message, 400, 'BAD_REQUEST', details);
    }

    static unauthorized(message = 'Não autorizado', details = null) {
        return new AppError(message, 401, 'UNAUTHORIZED', details);
    }

    static forbidden(message = 'Acesso negado', details = null) {
        return new AppError(message, 403, 'FORBIDDEN', details);
    }

    static notFound(message = 'Recurso não encontrado', details = null) {
        return new AppError(message, 404, 'NOT_FOUND', details);
    }

    static conflict(message = 'Conflito de dados', details = null) {
        return new AppError(message, 409, 'CONFLICT', details);
    }

    static validation(message = 'Erro de validação', details = null) {
        return new AppError(message, 422, 'VALIDATION_ERROR', details);
    }

    static tooManyRequests(message = 'Muitas requisições', details = null) {
        return new AppError(message, 429, 'TOO_MANY_REQUESTS', details);
    }

    static internal(message = 'Erro interno do servidor', details = null) {
        return new AppError(message, 500, 'INTERNAL_ERROR', details);
    }
}

module.exports = AppError;