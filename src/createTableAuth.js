const db = require('./config/db');

async function createAuthTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await db.execute("CREATE DATABASE IF NOT EXISTS myapp;");
        await db.execute(query);
        console.log('Tabela "users" criada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar a tabela:', error);
    } finally {
        process.exit();
    }
}

createAuthTable();
