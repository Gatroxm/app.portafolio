import { Router } from 'express'
import { enviarMensaje, verMensajes } from '../controllers/mensaje.controller.js'
import { verificarToken } from '../../middlewares/auth.middleware.js'

const router = Router()

// Ruta pública para enviar mensaje
router.post('/', verificarToken, enviarMensaje)

// Ruta protegida para ver mensajes del usuario logueado
router.get('/', verificarToken, verMensajes)

export default router
