const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuário no banco de dados
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        // Comparar senha com hash armazenado
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        // Verificar se a chave JWT está definida
        if (!process.env.JWT_SECRET) {
            console.error("Erro: JWT_SECRET não está definido!");
            return res.status(500).json({ message: "Erro interno no servidor" });
        }

        // Criar o token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        // console.log("Token gerado:", token); // Debug para verificar se o token está sendo criado

        // Enviar resposta com token e dados do usuário
        res.json({ 
            message: "Login bem-sucedido",
            token,
            user: { 
                id: user.id, 
                name: user.name, 
                email: user.email 
            } 
        });

    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};
