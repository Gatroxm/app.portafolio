import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verificarToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] // Espera "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded // Podés acceder luego a req.user.id, req.user.rol, etc.
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' })
    }
}
