<h1 align="center">
  AgroSys
</h1>

<h3 align="center">
Sistema Web para Gestão Agrícola voltado ao gerenciamento de plantações, estoque, vendas e tarefas.
</h3>

<p align="center">
    <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Fernanda135/AgroSys">
    <img alt="Repository size" src="https://img.shields.io/github/repo-size/Fernanda135/AgroSys">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Fernanda135/AgroSys">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-green">
</p>


<h4 align="center">
	> em desenvolvimento
</h4>

# Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Layout](#layout)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Como executar o projeto](#como-executar-o-projeto)
  - [Pré-requisitos](#pré-requisitos)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Autor](#autor)
- [Licença](#licença)

---

# Sobre o projeto

O **AgroSys** é um sistema web desenvolvido para auxiliar pequenos produtores rurais no gerenciamento das atividades agrícolas.

A plataforma permite controlar plantações, estoque de produtos, vendas e tarefas em um único ambiente, facilitando a organização da propriedade e contribuindo para a tomada de decisões baseada em informações atualizadas.

O sistema foi desenvolvido utilizando uma arquitetura baseada em API REST, separando frontend e backend para proporcionar maior organização, manutenção e escalabilidade.

---

# Funcionalidades

O AgroSys oferece as seguintes funcionalidades:

- Cadastro e autenticação de usuários
- Gerenciamento de plantações
  - Cadastro de culturas
  - Controle de datas de plantio e colheita
  - Status da produção
- Controle de estoque
  - Cadastro de produtos
  - Quantidade disponível
  - Valor unitário
- Gerenciamento de vendas
  - Registro de vendas
  - Itens vendidos
  - Controle do valor total
- Gerenciamento de tarefas
  - Cadastro de atividades
  - Controle de conclusão
- Dashboard com indicadores e gráficos

---

# Layout

## Login

> Adicione uma imagem da tela de login.

```
/assets/login.png
```

## Dashboard

> Adicione uma imagem do dashboard.

```
/assets/dashboard.png
```

## Plantações

> Adicione uma imagem do módulo de plantações.

## Estoque

> Adicione uma imagem do módulo de estoque.

## Vendas

> Adicione uma imagem do módulo de vendas.

---

# Tecnologias

## Frontend

- Next.js
- React
- TypeScript
- Axios
- Tailwind CSS
- PostCSS
- Lucide React
- React Toastify
- Recharts

## Backend

- Node.js
- Express
- Sequelize
- PostgreSQL
- JWT
- bcrypt.js
- cookie-parser
- dotenv

---

# Arquitetura

O projeto utiliza arquitetura cliente-servidor.

```
Frontend (Next.js)
        │
        │ HTTP/JSON
        ▼
API REST (Node.js + Express)
        │
        ▼
 Sequelize ORM
        │
        ▼
 PostgreSQL
```

---

# Como executar o projeto

## Pré-requisitos

Antes de iniciar, instale:

- Git
- Node.js
- PostgreSQL
- npm

---

## Backend

Clone o repositório

```bash
git clone https://github.com/Fernanda135/AgroSys.git
```

Entre na pasta

```bash
cd backend
```

Instale as dependências

```bash
npm install
```

Configure o arquivo `.env`

```env
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

JWT_SECRET=
REFRESH_TOKEN_SECRET=
```

Execute o servidor

```bash
npm run dev
```

A API estará disponível em

```
http://localhost:3001
```

---

## Frontend

Entre na pasta

```bash
cd frontend
```

Instale as dependências

```bash
npm install
```

Execute

```bash
npm run dev
```

A aplicação estará disponível em

```
http://localhost:3000
```

---

# Estrutura do Projeto

```
AgroSys
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   └── config
│   └── package.json
│
├── frontend
│   ├── app
│   ├── components
│   ├── hooks
│   ├── services
│   ├── styles
│   └── package.json
│
└── README.md
```

---

# Autor

**Fernanda Vitória Araújo Santos**

GitHub

https://github.com/Fernanda135

LinkedIn

> Adicione o link do seu LinkedIn.

---

# Licença

Este projeto está licenciado sob a licença MIT.