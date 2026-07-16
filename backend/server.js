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
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'RuralSys API Docs',
    swaggerOptions: {
        persistAuthorization: true,
    }
}));

// Rota para JSON do Swagger
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// Rotas públicas
app.use('/api/auth', authRoute);
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
});