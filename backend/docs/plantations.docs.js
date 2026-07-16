/**
 * @swagger
 * tags:
 *   - name: Plantations
 *     description: Gerenciamento de plantacoes
 */

/**
 * @swagger
 * /api/plantations:
 *   get:
 *     summary: Listar todas as plantacoes
 *     tags: [Plantations]
 *     description: Retorna todas as plantacoes do usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numero da pagina
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Itens por pagina
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
 *         description: Lista de plantacoes
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
 *         description: Nao autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   
 *   post:
 *     summary: Criar nova plantacao
 *     tags: [Plantations]
 *     description: Cria uma nova plantacao para o usuario autenticado
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
 *         description: Plantacao criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plantation'
 *       400:
 *         description: Dados invalidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Nao autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/plantations/{id}:
 *   get:
 *     summary: Buscar plantacao por ID
 *     tags: [Plantations]
 *     description: Retorna uma plantacao especifica do usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da plantacao
 *     responses:
 *       200:
 *         description: Plantacao encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plantation'
 *       404:
 *         description: Plantacao nao encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Nao autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   
 *   put:
 *     summary: Atualizar plantacao
 *     tags: [Plantations]
 *     description: Atualiza uma plantacao existente do usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da plantacao
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *         description: Plantacao atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plantation'
 *       404:
 *         description: Plantacao nao encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Nao autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   
 *   delete:
 *     summary: Deletar plantacao
 *     tags: [Plantations]
 *     description: Remove uma plantacao do usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da plantacao
 *     responses:
 *       200:
 *         description: Plantacao removida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Plantacao nao encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Nao autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/plantations/{id}/harvest:
 *   patch:
 *     summary: Marcar plantacao como colhida
 *     tags: [Plantations]
 *     description: Marca uma plantacao como colhida e atualiza a data de colheita
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da plantacao
 *     responses:
 *       200:
 *         description: Plantacao marcada como colhida
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
 *                   example: Plantacao marcada como colhida com sucesso
 *                 plantation:
 *                   $ref: '#/components/schemas/Plantation'
 *       400:
 *         description: Data de colheita invalida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Plantacao nao encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Nao autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/plantations/active:
 *   get:
 *     summary: Listar plantacoes ativas
 *     tags: [Plantations]
 *     description: Retorna apenas as plantacoes que ainda nao foram colhidas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de plantacoes ativas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plantation'
 *       401:
 *         description: Nao autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/plantations/harvested:
 *   get:
 *     summary: Listar plantacoes colhidas
 *     tags: [Plantations]
 *     description: Retorna apenas as plantacoes que ja foram colhidas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de plantacoes colhidas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plantation'
 *       401:
 *         description: Nao autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/plantations/statistics:
 *   get:
 *     summary: Estatisticas das plantacoes
 *     tags: [Plantations]
 *     description: Retorna estatisticas sobre as plantacoes do usuario
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estatisticas das plantacoes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total de plantacoes
 *                   example: 8
 *                 active:
 *                   type: integer
 *                   description: Plantacoes ativas
 *                   example: 5
 *                 harvested:
 *                   type: integer
 *                   description: Plantacoes colhidas
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
 *         description: Nao autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/plantations/culture/{culture}:
 *   get:
 *     summary: Buscar plantacoes por cultura
 *     tags: [Plantations]
 *     description: Retorna plantacoes que correspondem a uma cultura especifica
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: culture
 *         schema:
 *           type: string
 *         required: true
 *         description: "Nome da cultura (ex: Soja, Milho, Cafe)"
 *     responses:
 *       200:
 *         description: Lista de plantacoes da cultura
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plantation'
 *       401:
 *         description: Nao autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */