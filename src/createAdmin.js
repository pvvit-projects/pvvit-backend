const db = require('./config/db');
const bcrypt = require('bcryptjs');

async function createAdminUser() {
    const name = 'Admin';
    const email = 'admin@example.com';
    const password = 'admin123'; // Senha padrão (será criptografada)

    try {
        // Verifica se o usuário já existe
        const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            console.log('Usuário admin já existe!');
            process.exit();
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insere o usuário admin no banco de dados
        await db.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

        console.log('Usuário admin criado com sucesso!');
    } catch (error) {
        console.error('Erro ao criar usuário admin:', error);
    } finally {
        process.exit(); // Finaliza o script após a execução
    }
}

createAdminUser();
