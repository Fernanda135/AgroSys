/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do usuario
 *           example: 1
 *         name:
 *           type: string
 *           description: Nome do usuario
 *           example: Joao Silva
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuario
 *           example: joao@email.com
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: Papel do usuario
 *           example: user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-01-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2024-01-01T00:00:00.000Z
 *     
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Nome completo do usuario
 *           example: Joao Silva
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuario
 *           example: joao@email.com
 *         password:
 *           type: string
 *           format: password
 *           description: Senha (minimo 6 caracteres)
 *           example: 123456
 *         confirmPassword:
 *           type: string
 *           format: password
 *           description: Confirmacao da senha
 *           example: 123456
 *     
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuario
 *           example: joao@email.com
 *         password:
 *           type: string
 *           format: password
 *           description: Senha do usuario
 *           example: 123456
 *     
 *     RefreshTokenRequest:
 *       type: object
 *       required:
 *         - refreshToken
 *       properties:
 *         refreshToken:
 *           type: string
 *           description: Token de atualizacao
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         token:
 *           type: string
 *           description: Token de acesso JWT
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         refreshToken:
 *           type: string
 *           description: Token para atualizar o acesso
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         user:
 *           $ref: '#/components/schemas/User'
 *     
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           description: Mensagem de erro
 *           example: Credenciais invalidas
 *         error:
 *           type: string
 *           description: Detalhes do erro (em desenvolvimento)
 *           example: Invalid email or password
 *     
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           description: Mensagem de sucesso
 *           example: Operacao realizada com sucesso
 *     
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Comprar fertilizantes
 *         description:
 *           type: string
 *           example: Comprar 50kg de fertilizante NPK
 *         completed:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-01-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2024-01-01T00:00:00.000Z
 *     
 *     CreateTodoRequest:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Titulo da tarefa
 *           example: Comprar fertilizantes
 *         description:
 *           type: string
 *           description: Descricao da tarefa
 *           example: Comprar 50kg de fertilizante NPK
 *     
 *     UpdateTodoRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Titulo da tarefa
 *           example: Comprar fertilizantes organicos
 *         description:
 *           type: string
 *           description: Descricao da tarefa
 *           example: Comprar 50kg de fertilizante organico
 *         completed:
 *           type: boolean
 *           description: Status da tarefa
 *           example: true
 *     
 *     Stock:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 1
 *         product_name:
 *           type: string
 *           example: Trator
 *         category:
 *           type: string
 *           example: Maquinas
 *         quantity:
 *           type: integer
 *           example: 2
 *         unit_price:
 *           type: number
 *           format: float
 *           example: 150000.00
 *         unit:
 *           type: string
 *           example: un
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-01-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2024-01-01T00:00:00.000Z
 *     
 *     CreateStockRequest:
 *       type: object
 *       required:
 *         - product_name
 *         - quantity
 *         - unit_price
 *       properties:
 *         product_name:
 *           type: string
 *           description: Nome do produto
 *           example: Trator
 *         category:
 *           type: string
 *           description: Categoria do produto
 *           example: Maquinas
 *         quantity:
 *           type: integer
 *           description: Quantidade em estoque
 *           example: 2
 *         unit_price:
 *           type: number
 *           format: float
 *           description: Preco unitario
 *           example: 150000.00
 *         unit:
 *           type: string
 *           description: Unidade de medida
 *           example: un
 *     
 *     Plantation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 1
 *         culture:
 *           type: string
 *           example: Soja
 *         plantingDate:
 *           type: string
 *           format: date
 *           example: 2024-01-15
 *         harvestDate:
 *           type: string
 *           format: date
 *           example: 2024-06-15
 *         isHarvested:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-01-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2024-01-01T00:00:00.000Z
 *     
 *     Finance:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 1
 *         isIncome:
 *           type: boolean
 *           description: true = receita, false = despesa
 *           example: true
 *         description:
 *           type: string
 *           example: Venda de soja
 *         amount:
 *           type: number
 *           format: float
 *           example: 15000.00
 *         category:
 *           type: string
 *           example: Vendas
 *         transactionDate:
 *           type: string
 *           format: date
 *           example: 2024-06-15
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-01-01T00:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2024-01-01T00:00:00.000Z
 *     
 *     FinanceSummary:
 *       type: object
 *       properties:
 *         totalIncome:
 *           type: number
 *           format: float
 *           description: Total de receitas
 *           example: 150000.00
 *         totalExpense:
 *           type: number
 *           format: float
 *           description: Total de despesas
 *           example: 75000.00
 *         balance:
 *           type: number
 *           format: float
 *           description: Saldo (receitas - despesas)
 *           example: 75000.00
 *     
 *     AuditLog:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user_id:
 *           type: integer
 *           example: 1
 *         table_name:
 *           type: string
 *           description: Nome da tabela afetada
 *           example: Todos
 *         record_id:
 *           type: integer
 *           description: ID do registro afetado
 *           example: 1
 *         action:
 *           type: string
 *           enum: [CREATE, UPDATE, DELETE]
 *           description: Acao realizada
 *           example: CREATE
 *         old_values:
 *           type: object
 *           description: Valores antigos (para UPDATE e DELETE)
 *           example: { completed: false }
 *         new_values:
 *           type: object
 *           description: Novos valores (para CREATE e UPDATE)
 *           example: { title: "Nova tarefa", completed: false }
 *         ip_address:
 *           type: string
 *           description: IP do usuario
 *           example: 127.0.0.1
 *         user_agent:
 *           type: string
 *           description: User Agent do navegador
 *           example: Mozilla/5.0
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-01-01T00:00:00.000Z
 *     
 *     PaginationResponse:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           description: Total de registros
 *           example: 100
 *         page:
 *           type: integer
 *           description: Pagina atual
 *           example: 1
 *         totalPages:
 *           type: integer
 *           description: Total de paginas
 *           example: 10
 *         data:
 *           type: array
 *           description: Dados da pagina
 */