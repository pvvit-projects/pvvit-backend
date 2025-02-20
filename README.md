# 📌 API Backend Node.js com MySQL

Este projeto é uma API backend desenvolvida com Node.js e MySQL, implementando autenticação de usuários.

## 📂 Estrutura de Pastas

```
/backend
│── /src
│   │── /config        # Configurações da aplicação (ex: conexão com banco)
│   │── /controllers   # Controladores para lidar com a lógica das rotas
│   │── /middlewares   # Middlewares (ex: autenticação, logs)
│   │── /models        # Modelos e esquemas do banco de dados
│   │── /routes        # Definição das rotas da API
│   │── /services      # Regras de negócio e lógica de aplicação
│   │── /utils         # Funções utilitárias e helpers
│   │── app.js         # Configuração principal do Express
│   │── server.js      # Ponto de entrada do servidor
│── /node_modules
│── .env               # Variáveis de ambiente (ex: credenciais do banco)
│── .gitignore         # Arquivos para ignorar no Git
│── package.json       # Dependências e scripts do projeto
│── README.md          # Documentação do projeto
```

## 🚀 Inicialização do Projeto

### 1️⃣ Clonar o Repositório

```sh
git clone <URL_DO_REPOSITORIO>
cd backend
```

### 2️⃣ Instalar Dependências

```sh
npm install
```

### 3️⃣ Configurar Variáveis de Ambiente (`.env`)

Crie um arquivo `.env` na raiz do projeto e adicione:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=myapp
JWT_SECRET=sua_chave_secreta
PORT=5000
```

### 4️⃣ Criar Banco de Dados e Tabelas

```sh
npm run setup-db
```

### 5️⃣ Iniciar o Servidor

```sh
npm run dev
```

## 🗂 Rotas da API

### 🔑 Autenticação

#### 🔹 Login
- **Rota:** `POST /api/auth/login`
- **Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```
- **Resposta:**
```json
{
  "token": "jwt_token",
  "user": {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "usuario@email.com"
  }
}
```

## 📌 Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- dotenv
- jsonwebtoken
- bcryptjs
- cors
- nodemon

## 📜 Licença

Este projeto é open-source e pode ser utilizado livremente. 🚀
