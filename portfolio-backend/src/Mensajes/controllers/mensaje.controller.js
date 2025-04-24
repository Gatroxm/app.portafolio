import { crearMensaje, obtenerMensajesPorUsuario } from '../models/mensaje.model.js'

export const enviarMensaje = async (req, res) => {
    try {
        const { para_usuario_id, nombre_emisor, email_emisor, mensaje } = req.body

        if (!para_usuario_id || !nombre_emisor || !email_emisor || !mensaje) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' })
        }

        const id = await crearMensaje({ para_usuario_id, nombre_emisor, email_emisor, mensaje })
        res.status(201).json({ message: 'Mensaje enviado correctamente', id })
    } catch (error) {
        res.status(500).json({ message: 'Error al enviar mensaje', error })
    }
}

export const verMensajes = async (req, res) => {
    try {
        const usuario_id = req.user.id // viene del JWT
        const mensajes = await obtenerMensajesPorUsuario(usuario_id)
        res.json(mensajes)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los mensajes', error })
    }
}
