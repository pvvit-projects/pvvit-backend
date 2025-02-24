const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        if (!process.env.JWT_SECRET) {
            console.error("Erro: JWT_SECRET não está definido!");
            return res.status(500).json({ message: "Erro interno no servidor" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, userType: user.userType }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({ 
            message: "Login bem-sucedido",
            token,
            user: { 
                id: user.id, 
                name: user.name, 
                email: user.email,
                userType: user.userType,
                user_type_id: user.user_type_id
            } 
        });

    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};
