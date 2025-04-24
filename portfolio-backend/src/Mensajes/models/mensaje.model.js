import { db } from '../../config/db.js'

export const crearMensaje = async ({ para_usuario_id, nombre_emisor, email_emisor, mensaje }) => {
    const [result] = await db.query(
        'INSERT INTO mensajes (para_usuario_id, nombre_emisor, email_emisor, mensaje) VALUES (?, ?, ?, ?)',
        [para_usuario_id, nombre_emisor, email_emisor, mensaje]
    )
    return result.insertId
}

export const obtenerMensajesPorUsuario = async (usuario_id) => {
    const [mensajes] = await db.query(
        'SELECT * FROM mensajes WHERE para_usuario_id = ? ORDER BY creado_en DESC',
        [usuario_id]
    )
    return mensajes
}
