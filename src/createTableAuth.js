const db = require('./config/db');

async function createTables() {
    const userTypeQuery = `
        CREATE TABLE IF NOT EXISTS userType (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) UNIQUE NOT NULL
        );
    `;

    const usersQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            user_type_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_type_id) REFERENCES userType(id) ON DELETE CASCADE
        );
    `;

    try {
        await db.execute("CREATE DATABASE IF NOT EXISTS myapp;");
        await db.execute(userTypeQuery);
        await db.execute(usersQuery);
        console.log('Tabelas "userType" e "users" criadas com sucesso!');
    } catch (error) {
        console.error('Erro ao criar tabelas:', error);
    } finally {
        process.exit();
    }
}

createTables();
