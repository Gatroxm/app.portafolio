
import express from 'express';
import dotenv from 'dotenv';
import { db } from '../config/db.js';

dotenv.config();

const app = express();
app.use(express.json());
/**
 * Configuracion de rutas
 */
import authRoutes from '../routes/auth.routes.js';

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
/**
 * Configuracion de puerto
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
