import { db } from '../config/db.js';
import bcrypt from 'bcryptjs';

// Crear usuario
export const createUser = async (req, res) => {
    try {
        const { nombre, correo, nickname, password, rol } = req.body

        // Validar campos requeridos (podés mejorar esta validación)
        if (!nombre || !correo || !nickname || !password) {
            return res.status(400).json({ message: 'Faltan datos obligatorios' })
        }


        let rolInsert = rol;
        if (!rol) {
            rolInsert = 'usuario'
        }

        // Insertar en la BD
        const [result] = await db.query(
            'INSERT INTO usuarios (nombre, correo, nickname, password, rol) VALUES (?, ?, ?, ?, ?)',
            [nombre, correo, nickname, await returnPasswordEncipted(password), rolInsert]
        )

        res.status(201).json({ message: 'Usuario creado correctamente', id: result.insertId })
    } catch (error) {
        console.error('Error al crear usuario:', error)
        res.status(500).json({ message: 'Error del servidor' })
    }
}

// Actualizar usuario
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, correo, nickname } = req.body;

        await db.query(
            'UPDATE usuarios SET nombre = ?, correo = ?, nickname = ? WHERE id = ?',
            [nombre, correo, nickname, id]
        );

        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await db.query('DELETE FROM usuarios WHERE id = ?', [id]);

        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Editar Contraseña
export const editPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        await db.query('UPDATE usuarios SET password = ? WHERE id = ?', [await returnPasswordEncipted(password), id]);

        res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error('Error al editar contraseña:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Encriptar la contraseña
async function returnPasswordEncipted(password) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};
