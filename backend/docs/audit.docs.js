/**
 * @swagger
 * tags:
 *   - name: Audit Logs
 *     description: 📋 Gerenciamento de logs de auditoria
 */

/**
 * @swagger
 * /api/audit-logs:
 *   get:
 *     summary: 📋 Listar todos os logs de auditoria
 *     tags: [Audit Logs]
 *     description: Retorna todos os logs de auditoria do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Itens por página
 *       - in: query
 *         name: table_name
 *         schema:
 *           type: string
 *         description: Filtrar por tabela
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *           enum: [CREATE, UPDATE, DELETE]
 *         description: Filtrar por ação
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data inicial
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data final
 *     responses:
 *       200:
 *         description: ✅ Lista de logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 100
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AuditLog'
 *       401:
 *         description: ❌ Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: 💥 Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/audit-logs/{id}:
 *   get:
 *     summary: 🔍 Buscar log por ID
 *     tags: [Audit Logs]
 *     description: Retorna um log de auditoria específico
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do log
 *     responses:
 *       200:
 *         description: ✅ Log encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuditLog'
 *       404:
 *         description: ❌ Log não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: ❌ Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: 💥 Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/audit-logs/table/{table_name}:
 *   get:
 *     summary: 📋 Buscar logs por tabela
 *     tags: [Audit Logs]
 *     description: Retorna logs de auditoria de uma tabela específica
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: table_name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome da tabela (ex: Todos, Stocks)
 *       - in: query
 *         name: record_id
 *         schema:
 *           type: integer
 *         description: ID do registro específico
 *     responses:
 *       200:
 *         description: ✅ Logs encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AuditLog'
 *       401:
 *         description: ❌ Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: 💥 Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/audit-logs/action/{action}:
 *   get:
 *     summary: 📋 Buscar logs por ação
 *     tags: [Audit Logs]
 *     description: Retorna logs de auditoria de uma ação específica
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: action
 *         schema:
 *           type: string
 *           enum: [CREATE, UPDATE, DELETE]
 *         required: true
 *         description: Tipo de ação
 *     responses:
 *       200:
 *         description: ✅ Logs encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AuditLog'
 *       401:
 *         description: ❌ Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: 💥 Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/audit-logs/stats:
 *   get:
 *     summary: 📊 Estatísticas de auditoria
 *     tags: [Audit Logs]
 *     description: Retorna estatísticas sobre os logs de auditoria
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ✅ Estatísticas de auditoria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 150
 *                 actions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       action:
 *                         type: string
 *                         example: CREATE
 *                       count:
 *                         type: integer
 *                         example: 75
 *                 tables:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       table_name:
 *                         type: string
 *                         example: Todos
 *                       count:
 *                         type: integer
 *                         example: 50
 *                 recent:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AuditLog'
 *       401:
 *         description: ❌ Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: 💥 Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/audit-logs/clean:
 *   delete:
 *     summary: 🗑️ Limpar logs antigos (Admin)
 *     tags: [Audit Logs]
 *     description: Remove logs de auditoria mais antigos que X dias (apenas admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *           default: 30
 *         description: Dias de retenção (logs mais antigos serão removidos)
 *     responses:
 *       200:
 *         description: ✅ Logs removidos com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 50 logs removidos com sucesso
 *                 deleted:
 *                   type: integer
 *                   example: 50
 *       403:
 *         description: ❌ Acesso negado (apenas admin)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: ❌ Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: 💥 Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */