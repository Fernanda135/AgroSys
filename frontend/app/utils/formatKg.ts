export const formatKg = (value: number): string => {
    if (value === 0 || !value) return '0 kg';
    
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)} t`;
    }
    
    if (value >= 1000) {
        return `${(value / 1000).toFixed(1)} kg`;
    }
    
    return `${value} kg`;
};

export const formatKgShort = (value: number): string => {
    if (value === 0 || !value) return '0';
    
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}t`;
    }
    
    if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}kg`;
    }
    
    return `${value}kg`;
};

export const formatKgWithUnit = (value: number, unit: 'kg' | 't' | 'g' = 'kg'): string => {
    if (value === 0 || !value) return `0 ${unit}`;
    
    switch (unit) {
        case 't':
            return `${(value / 1000).toFixed(2)} t`;
        case 'g':
            return `${(value * 1000).toFixed(0)} g`;
        case 'kg':
        default:
            return formatKg(value);
    }
};

export const formatProduction = (value: number, unit?: string): string => {
    if (!value || value === 0) return '0 kg';
    
    let kgValue = value;
    
    switch (unit?.toUpperCase()) {
        case 'TON':
        case 'TONELADA':
            kgValue = value * 1000;
            break;
        case 'G':
        case 'GRAMA':
            kgValue = value / 1000;
            break;
        case 'KG':
        case 'QUILOGRAMA':
        default:
            kgValue = value;
            break;
    }
    
    return formatKg(kgValue);
};

const formatKgUtils = {
    formatKg,
    formatKgShort,
    formatKgWithUnit,
    formatProduction
};

export default formatKgUtils;