/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: 🔐 Autenticação e gerenciamento de usuários
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: 📝 Registrar um novo usuário
 *     tags: [Auth]
 *     description: Cria uma nova conta de usuário no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *           examples:
 *             exemplo1:
 *               summary: Exemplo de registro
 *               value:
 *                 name: João Silva
 *                 email: joao@email.com
 *                 password: 123456
 *                 confirmPassword: 123456
 *     responses:
 *       201:
 *         description: ✅ Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               user:
 *                 id: 1
 *                 name: João Silva
 *                 email: joao@email.com
 *                 createdAt: 2024-01-01T00:00:00.000Z
 *                 updatedAt: 2024-01-01T00:00:00.000Z
 *       400:
 *         description: ❌ Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               email_ja_existe:
 *                 summary: Email já cadastrado
 *                 value:
 *                   success: false
 *                   message: Email já está em uso
 *               senha_invalida:
 *                 summary: Senha muito curta
 *                 value:
 *                   success: false
 *                   message: A senha deve ter pelo menos 6 caracteres
 *       500:
 *         description: 💥 Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: 🔑 Login do usuário
 *     tags: [Auth]
 *     description: Autentica o usuário e retorna os tokens de acesso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           examples:
 *             exemplo1:
 *               summary: Exemplo de login
 *               value:
 *                 email: joao@email.com
 *                 password: 123456
 *     responses:
 *       200:
 *         description: ✅ Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               user:
 *                 id: 1
 *                 name: João Silva
 *                 email: joao@email.com
 *                 createdAt: 2024-01-01T00:00:00.000Z
 *                 updatedAt: 2024-01-01T00:00:00.000Z
 *       401:
 *         description: ❌ Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Credenciais inválidas
 *       500:
 *         description: 💥 Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: 🔄 Atualizar token de acesso
 *     tags: [Auth]
 *     description: Gera um novo token de acesso usando o refresh token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *           examples:
 *             exemplo1:
 *               summary: Exemplo de refresh
 *               value:
 *                 refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: ✅ Token atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 refreshToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: ❌ Token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Refresh token inválido ou expirado
 *       500:
 *         description: 💥 Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: 🚪 Logout do usuário
 *     tags: [Auth]
 *     description: Invalida o refresh token do usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ✅ Logout realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               message: Logout realizado com sucesso
 *       401:
 *         description: ❌ Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: 💥 Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: 👤 Obter dados do usuário logado
 *     tags: [Auth]
 *     description: Retorna os dados do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: ✅ Dados do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               id: 1
 *               name: João Silva
 *               email: joao@email.com
 *               createdAt: 2024-01-01T00:00:00.000Z
 *               updatedAt: 2024-01-01T00:00:00.000Z
 *       401:
 *         description: ❌ Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: 💥 Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/auth/change-password:
 *   put:
 *     summary: 🔒 Alterar senha do usuário
 *     tags: [Auth]
 *     description: Altera a senha do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *               - confirmNewPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 description: Senha atual
 *                 example: 123456
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 description: Nova senha
 *                 example: 654321
 *               confirmNewPassword:
 *                 type: string
 *                 format: password
 *                 description: Confirmação da nova senha
 *                 example: 654321
 *     responses:
 *       200:
 *         description: ✅ Senha alterada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               message: Senha alterada com sucesso
 *       400:
 *         description: ❌ Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               senhas_diferentes:
 *                 summary: Senhas não coincidem
 *                 value:
 *                   success: false
 *                   message: As senhas não coincidem
 *               senha_fraca:
 *                 summary: Senha muito curta
 *                 value:
 *                   success: false
 *                   message: A nova senha deve ter pelo menos 6 caracteres
 *       401:
 *         description: ❌ Senha atual incorreta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Senha atual incorreta
 *       500:
 *         description: 💥 Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */