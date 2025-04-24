
import express from 'express';
import dotenv from 'dotenv';
import { db } from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());
/**
 * Configuracion de rutas
 */
import authRoutes from './Usuarios/routes/auth.routes.js';
import userRoutes from './Usuarios/routes/user.routes.js';
import mensajeRoutes from './Mensajes/routes/mensaje.routes.js';

app.get('/api/ping', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        res.json({ success: true, result: rows[0].result });
    } catch (error) {
        console.error('Error al conectar con la DB', error);
        res.status(500).json({ success: false, error: 'DB connection error' });
    }
});
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/mensajes', mensajeRoutes);
/**
 * Configuracion de puerto
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
