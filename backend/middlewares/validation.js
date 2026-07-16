const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

const validate = (validations) => {
    return async (req, res, next) => {
        // Executa todas as validações
        await Promise.all(validations.map(validation => validation.run(req)));

        // Verifica erros
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        // Formata os erros
        const errorDetails = errors.array().map(err => ({
            field: err.param,
            message: err.msg,
            value: err.value
        }));

        throw AppError.validation('Erro de validação dos dados', errorDetails);
    };
};

module.exports = { validate };