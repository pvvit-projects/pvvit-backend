const db = require('../config/db');

class User {
    static async findByEmail(email) {
        const [rows] = await db.execute(`
            SELECT users.*, userType.name AS userType 
            FROM users
            JOIN userType ON users.user_type_id = userType.id
            WHERE users.email = ?
        `, [email]);

        return rows[0]; // Retorna o primeiro usuário encontrado
    }

    static async create(name, email, password, userTypeId) {
        const [result] = await db.execute(
            'INSERT INTO users (name, email, password, user_type_id) VALUES (?, ?, ?, ?)',
            [name, email, password, userTypeId]
        );
        return result.insertId;
    }
}

module.exports = User;
