/**
 * @swagger
 * tags:
 *   - name: Finances
 *     description: 💰 Gerenciamento financeiro
 */

/**
 * @swagger
 * /api/finances:
 *   get:
 *     summary: 💰 Listar todas as transações
 *     tags: [Finances]
 *     description: Retorna todas as transações financeiras do usuário autenticado
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
 *           default: 10
 *         description: Itens por página
 *       - in: query
 *         name: isIncome
 *         schema:
 *           type: boolean
 *         description: Filtrar por tipo (true=receita, false=despesa)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data inicial do período
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data final do período
 *     responses:
 *       200:
 *         description: ✅ Lista de transações
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 30
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *                 summary:
 *                   type: object
 *                   properties:
 *                     totalIncome:
 *                       type: number
 *                       format: float
 *                       example: 150000.00
 *                     totalExpense:
 *                       type: number
 *                       format: float
 *                       example: 75000.00
 *                     balance:
 *                       type: number
 *                       format: float
 *                       example: 75000.00
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Finance'
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
 *   
 *   post:
 *     summary: ➕ Criar nova transação
 *     tags: [Finances]
 *     description: Cria uma nova transação financeira (receita ou despesa)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - amount
 *               - isIncome
 *             properties:
 *               isIncome:
 *                 type: boolean
 *                 description: true = receita, false = despesa
 *                 example: true
 *               description:
 *                 type: string
 *                 description: Descrição da transação
 *                 example: Venda de soja
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: Valor da transação
 *                 example: 15000.00
 *               category:
 *                 type: string
 *                 description: Categoria da transação
 *                 example: Vendas
 *               transactionDate:
 *                 type: string
 *                 format: date
 *                 description: Data da transação
 *                 example: 2024-06-15
 *     responses:
 *       201:
 *         description: ✅ Transação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Finance'
 *       400:
 *         description: ❌ Dados inválidos
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
 * /api/finances/{id}:
 *   get:
 *     summary: 🔍 Buscar transação por ID
 *     tags: [Finances]
 *     description: Retorna uma transação específica do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da transação
 *     responses:
 *       200:
 *         description: ✅ Transação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Finance'
 *       404:
 *         description: ❌ Transação não encontrada
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
 *   
 *   put:
 *     summary: ✏️ Atualizar transação
 *     tags: [Finances]
 *     description: Atualiza uma transação existente do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da transação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isIncome:
 *                 type: boolean
 *                 example: false
 *               description:
 *                 type: string
 *                 example: Compra de fertilizantes
 *               amount:
 *                 type: number
 *                 format: float
 *                 example: 5000.00
 *               category:
 *                 type: string
 *                 example: Insumos
 *               transactionDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-06-20
 *     responses:
 *       200:
 *         description: ✅ Transação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Finance'
 *       404:
 *         description: ❌ Transação não encontrada
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
 *   
 *   delete:
 *     summary: 🗑️ Deletar transação
 *     tags: [Finances]
 *     description: Remove uma transação do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da transação
 *     responses:
 *       200:
 *         description: ✅ Transação removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: ❌ Transação não encontrada
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
 * /api/finances/summary:
 *   get:
 *     summary: 📊 Resumo financeiro
 *     tags: [Finances]
 *     description: Retorna um resumo com totais de receitas, despesas e saldo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data inicial do período
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data final do período
 *     responses:
 *       200:
 *         description: ✅ Resumo financeiro
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FinanceSummary'
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
 * /api/finances/categories:
 *   get:
 *     summary: 📊 Transações por categoria
 *     tags: [Finances]
 *     description: Retorna transações agrupadas por categoria
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: isIncome
 *         schema:
 *           type: boolean
 *         description: Filtrar por tipo (true=receita, false=despesa)
 *     responses:
 *       200:
 *         description: ✅ Transações por categoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                     example: Vendas
 *                   total:
 *                     type: number
 *                     format: float
 *                     example: 15000.00
 *                   count:
 *                     type: integer
 *                     example: 5
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
 * /api/finances/period:
 *   get:
 *     summary: 📅 Transações por período
 *     tags: [Finances]
 *     description: Retorna transações de um mês/ano específico
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         required: true
 *         description: Mês (1-12)
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Ano (ex: 2024)
 *     responses:
 *       200:
 *         description: ✅ Transações do período
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Finance'
 *       400:
 *         description: ❌ Parâmetros inválidos
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