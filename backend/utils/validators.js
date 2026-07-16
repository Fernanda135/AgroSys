const validators = {

    required: (value, fieldName) => {
        if (!value || (typeof value === 'string' && value.trim().length === 0)) {
            throw new Error(`O campo "${fieldName}" é obrigatório`);
        }
        return true;
    },

    positiveNumber: (value, fieldName) => {
        const num = parseFloat(value);
        if (isNaN(num) || num < 0) {
            throw new Error(`O campo "${fieldName}" deve ser um número positivo`);
        }
        return true;
    },

    positiveInteger: (value, fieldName) => {
        const num = parseInt(value);
        if (isNaN(num) || num < 0 || !Number.isInteger(num)) {
            throw new Error(`O campo "${fieldName}" deve ser um número inteiro positivo`);
        }
        return true;
    },

    validDate: (value, fieldName) => {
        if (value) {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                throw new Error(`O campo "${fieldName}" deve ser uma data válida`);
            }
        }
        return true;
    },

    validBoolean: (value, fieldName) => {
        if (value !== undefined && typeof value !== 'boolean') {
            throw new Error(`O campo "${fieldName}" deve ser verdadeiro ou falso`);
        }
        return true;
    },

    lengthBetween: (value, fieldName, min, max) => {
        if (value) {
            const str = value.toString();
            if (str.length < min) {
                throw new Error(`O campo "${fieldName}" deve ter no mínimo ${min} caracteres`);
            }
            if (max && str.length > max) {
                throw new Error(`O campo "${fieldName}" deve ter no máximo ${max} caracteres`);
            }
        }
        return true;
    }
};

module.exports = validators;