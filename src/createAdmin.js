const db = require('./config/db');
const bcrypt = require('bcryptjs');

async function createAdminUser() {
    const name = 'Admin';
    const email = 'admin@example.com';
    const password = 'admin123';

    try {
        // Inserir os tipos de usuário se não existirem
        await db.execute('INSERT IGNORE INTO userType (id, name) VALUES (1, "Admin"), (2, "User")');

        // Verifica se o usuário admin já existe
        const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            console.log('Usuário admin já existe!');
            process.exit();
        }

        // Criptografar senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar usuário admin com user_type_id = 1
        await db.execute(
            'INSERT INTO users (name, email, password, user_type_id) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, 1]
        );

        console.log('Usuário admin criado com sucesso!');
    } catch (error) {
        console.error('Erro ao criar usuário admin:', error);
    } finally {
        process.exit();
    }
}

createAdminUser();
