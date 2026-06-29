// middlewares/audit.middleware.js
const db = require('../models');

const auditLog = async (req, res, next) => {
    // Salvar dados originais do método send
    const originalSend = res.send;
    
    res.send = function(data) {
        // Verificar se é uma operação que deve ser logada
        if (req.method !== 'GET') {
            const logData = {
                user_id: req.user ? req.user.id : null,
                table_name: req.baseUrl.split('/').pop(),
                action: req.method,
                ip_address: req.ip || req.connection.remoteAddress,
                user_agent: req.headers['user-agent']
            };

            // Pegar dados da requisição
            if (req.method === 'POST' || req.method === 'PUT') {
                logData.new_values = req.body;
            }

            // Salvar log assincronamente
            db.AuditLog.create(logData).catch(err => {
                console.error('Erro ao salvar log:', err);
            });
        }
        
        originalSend.call(this, data);
    };
    
    next();
};

module.exports = { auditLog };