const db = require('./config/db');

async function createTestTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS test_table (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await db.execute(query);
        console.log('Tabela "test_table" criada com sucesso!');
    } catch (error) {
        console.error('Erro ao criar a tabela:', error);
    } finally {
        process.exit(); // Finaliza o script após a execução
    }
}

createTestTable();
