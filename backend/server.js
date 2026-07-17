const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Importação das rotas
const auditLogRoute = require('./routes/auditLog.routes');
const authRoute = require('./routes/auth.routes');
const financeRoute = require('./routes/finances.routes');
const plantationRoute = require('./routes/plantations.routes');
const profileRoute = require('./routes/profile.route');
const stockRoute = require('./routes/stock.route');
const todoRoute = require('./routes/todos.routes');

// Importação dos middlewares
const { verifyToken } = require('./middlewares/auth.middleware');
const { auditLog } = require('./middlewares/audit.middleware');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFound');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

// CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
        console.log(`   -${req.method} ${req.url}`);
        next();
    });
}

// SWAGGER - Documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'AgroSys API Docs',
    swaggerOptions: {
        persistAuthorization: true,
        docExpansion: 'none',
        filter: true,
        showRequestDuration: true,
    }
}));

app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});


// ROTAS

// Auth
app.use('/api/auth', authRoute);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Rotas com autenticação

// Profile
app.use('/api/profile', verifyToken, auditLog, profileRoute);

// Todos (tarefas)
app.use('/api/todos', verifyToken, auditLog, todoRoute);

// Stock (estoque)
app.use('/api/stocks', verifyToken, auditLog, stockRoute);

// Plantations (plantações)
app.use('/api/plantations', verifyToken, auditLog, plantationRoute);

// Finances (finanças)
app.use('/api/finances', verifyToken, auditLog, financeRoute);

// Audit Logs (logs de auditoria)
app.use('/api/audit-logs', verifyToken, auditLog, auditLogRoute);


app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});
app.use(notFoundHandler);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Documentação: http://localhost:${port}/api-docs`);
    console.log(`Health check: http://localhost:${port}/health`);
    console.log(`URL: http://localhost:${port}`);
});

module.exports = app;