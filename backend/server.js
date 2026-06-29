const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Importação das rotas
const authRoute = require('./routes/auth.route.js');
const profileRoute = require('./routes/profile.route.js');
const todoRoute = require('./routes/todos.routes.js');
const stockRoute = require('./routes/stock.route.js');
const plantationRoute = require('./routes/plantations.routes.js');
const financeRoute = require('./routes/finances.route.js');
const auditLogRoute = require('./routes/auditLog.routes.js');

// Importação dos middlewares
const { verifyToken } = require('./middlewares/auth.middleware');
const { auditLog } = require('./middlewares/audit.middleware.js');

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoute);

// Rotas protegidas com auditoria
app.use('/api', verifyToken, auditLog, profileRoute);
app.use('/api', verifyToken, auditLog, todoRoute);
app.use('/api', verifyToken, auditLog, stockRoute);
app.use('/api', verifyToken, auditLog, plantationRoute);
app.use('/api', verifyToken, auditLog, financeRoute);

// Rota de auditoria
app.use('/api', auditLogRoute);

// Rota de health check
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Middleware de erro
app.use((err, req, res, next) => {
    console.error('❌ Erro:', err);
    res.status(500).json({
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    console.log(`http://localhost:${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('\nRotas disponíveis:');
    console.log(`  POST /api/auth/login`);
    console.log(`  POST /api/auth/register`);
    console.log(`  GET  /api/profile`);
    console.log(`  GET  /api/todos`);
    console.log(`  GET  /api/stocks`);
    console.log(`  GET  /api/plantations`);
    console.log(`  GET  /api/finances`);
    console.log(`  GET  /api/audit-logs`);
    console.log(`  GET  /health`);
});