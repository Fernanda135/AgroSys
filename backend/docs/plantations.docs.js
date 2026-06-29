/**
 * @swagger
 * tags:
 *   - name: Plantations
 *     description: 🌱 Gerenciamento de plantações
 */

/**
 * @swagger
 * /api/plantations:
 *   get:
 *     summary: 🌱 Listar todas as plantações
 *     tags: [Plantations]
 *     description: Retorna todas as plantações do usuário autenticado
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
 *         name: culture
 *         schema:
 *           type: string
 *         description: Filtrar por cultura
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por nome
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, harvested]
 *         description: Filtrar por status (ativa/colhida)
 *     responses:
 *       200:
 *         description: ✅ Lista de plantações
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 8
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Plantation'
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
 *     summary: 🌱 Criar nova plantação
 *     tags: [Plantations]
 *     description: Cria uma nova plantação para o usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da plantação
 *                 example: Fazenda São José
 *               culture:
 *                 type: string
 *                 description: Cultura plantada
 *                 example: Soja
 *               plantingDate:
 *                 type: string
 *                 format: date
 *                 description: Data de plantio
 *                 example: 2024-01-15
 *               harvestDate:
 *                 type: string
 *                 format: date
 *                 description: Data prevista para colheita
 *                 example: 2024-06-15
 *     responses:
 *       201:
 *         description: ✅ Plantação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plantation'
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
 * /api/plantations/{id}:
 *   get:
 *     summary: 🔍 Buscar plantação por ID
 *     tags: [Plantations]
 *     description: Retorna uma plantação específica do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da plantação
 *     responses:
 *       200:
 *         description: ✅ Plantação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plantation'
 *       404:
 *         description: ❌ Plantação não encontrada
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
 *     summary: ✏️ Atualizar plantação
 *     tags: [Plantations]
 *     description: Atualiza uma plantação existente do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da plantação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Fazenda São José - Soja
 *               culture:
 *                 type: string
 *                 example: Soja
 *               plantingDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-01-15
 *               harvestDate:
 *                 type: string
 *                 format: date
 *                 example: 2024-06-15
 *     responses:
 *       200:
 *         description: ✅ Plantação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plantation'
 *       404:
 *         description: ❌ Plantação não encontrada
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
 *     summary: 🗑️ Deletar plantação
 *     tags: [Plantations]
 *     description: Remove uma plantação do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da plantação
 *     responses:
 *       200:
 *         description: ✅ Plantação removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: ❌ Plantação não encontrada
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
 * /api/plantations/{id}/harvest:
 *   patch:
 *     summary: 🌾 Marcar plantação como colhida
 *     tags: [Plantations]
 *     description: Marca uma plantação como colhida e atualiza a data de colheita
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da plantação
 *     responses:
 *       200:
 *         description: ✅ Plantação marcada como colhida
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
 *                   example: Plantação marcada como colhida com sucesso
 *                 plantation:
 *                   $ref: '#/components/schemas/Plantation'
 *       400:
 *         description: ❌ Data de colheita inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: ❌ Plantação não encontrada
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
 * /api/plantations/active:
 *   get:
 *     summary: 🌱 Listar plantações ativas
 *     tags: [Plantations]
 *     description: Retorna apenas as plantações que ainda não foram colhidas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ✅ Lista de plantações ativas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plantation'
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
 * /api/plantations/harvested:
 *   get:
 *     summary: 🌾 Listar plantações colhidas
 *     tags: [Plantations]
 *     description: Retorna apenas as plantações que já foram colhidas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ✅ Lista de plantações colhidas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plantation'
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
 * /api/plantations/statistics:
 *   get:
 *     summary: 📊 Estatísticas das plantações
 *     tags: [Plantations]
 *     description: Retorna estatísticas sobre as plantações do usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ✅ Estatísticas das plantações
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total de plantações
 *                   example: 8
 *                 active:
 *                   type: integer
 *                   description: Plantações ativas
 *                   example: 5
 *                 harvested:
 *                   type: integer
 *                   description: Plantações colhidas
 *                   example: 3
 *                 topCultures:
 *                   type: array
 *                   description: Culturas mais plantadas
 *                   items:
 *                     type: object
 *                     properties:
 *                       culture:
 *                         type: string
 *                         example: Soja
 *                       count:
 *                         type: integer
 *                         example: 4
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
 * /api/plantations/culture/{culture}:
 *   get:
 *     summary: 🔍 Buscar plantações por cultura
 *     tags: [Plantations]
 *     description: Retorna plantações que correspondem a uma cultura específica
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: culture
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome da cultura (ex: Soja, Milho, Café)
 *     responses:
 *       200:
 *         description: ✅ Lista de plantações da cultura
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plantation'
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