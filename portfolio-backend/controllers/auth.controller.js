import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [email]);
        const user = rows[0];

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '4h' }
        );

        res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
}
