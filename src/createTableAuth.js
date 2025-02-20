const db = require('./config/db');

async function createTables() {
    const queries = [
        "CREATE DATABASE IF NOT EXISTS myapp;",
        "USE myapp;",
        `CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );`
    ];

    try {
        for (const query of queries) {
            await db.execute(query);
        }
        console.log('Banco de dados e tabela "users" criados com sucesso!');
    } catch (error) {
        console.error('Erro ao criar tabelas:', error);
    } finally {
        process.exit();
    }
}

createTables();