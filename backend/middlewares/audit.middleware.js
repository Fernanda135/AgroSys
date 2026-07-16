const db = require('../models');

const auditLog = async (req, res, next) => {
    if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
        return next();
    }

    const originalSend = res.send;
    
    res.send = function(data) {
        try {
            let recordId = null;
            
            if (req.params && req.params.id) {
                recordId = parseInt(req.params.id);
            }
            
            if (!recordId && data) {
                try {
                    const response = typeof data === 'string' ? JSON.parse(data) : data;
                    if (response && response.data && response.data.id) {
                        recordId = response.data.id;
                    } else if (response && response.id) {
                        recordId = response.id;
                    }
                } catch (e) {}
            }

            if (!recordId && req.body && req.body.id) {
                recordId = parseInt(req.body.id);
            }

            const oldValues = req.oldValues || null;

            let newValues = null;
            if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
                newValues = { ...req.body };
                delete newValues.password;
                delete newValues.confirmPassword;
                delete newValues.token;
                delete newValues.refreshToken;
            }

            const tableName = req.baseUrl 
                ? req.baseUrl.split('/').pop() 
                : 'Unknown';

            db.AuditLog.create({
                user_id: req.user ? req.user.id : null,
                table_name: tableName,
                record_id: recordId,
                action: req.method,
                old_values: oldValues,
                new_values: newValues,
                ip_address: req.ip || req.connection?.remoteAddress || null,
                user_agent: req.headers['user-agent'] || null
            }).catch(err => {
                console.error('Erro ao salvar log de auditoria:', err.message);
            });

        } catch (error) {
            console.error('Erro no middleware de auditoria:', error.message);
        }
        
        res.send = originalSend;
        return originalSend.call(this, data);
    };
    
    next();
};

const logAction = async (req, tableName, recordId, action, oldValues, newValues) => {
    try {
        await db.AuditLog.create({
            user_id: req.user.id,
            table_name: tableName,
            record_id: recordId,
            action: action,
            old_values: oldValues,
            new_values: newValues,
            ip_address: req.ip || req.connection?.remoteAddress,
            user_agent: req.headers['user-agent']
        });
    } catch (error) {
        console.error('Erro ao logar ação manual:', error.message);
    }
};

module.exports = { auditLog, logAction };