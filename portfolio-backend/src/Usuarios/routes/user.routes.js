// routes/user.routes.js
import { Router } from 'express'
import { createUser, updateUser, deleteUser, editPassword } from '../controllers/user.controller.js'
import { verificarToken } from '../../middlewares/auth.middleware.js'

const router = Router()

// Todas estas rutas protegidas con JWT
router.post('/', verificarToken, createUser)
router.put('/:id', verificarToken, updateUser)
router.put('/password/:id', verificarToken, editPassword)
router.delete('/:id', verificarToken, deleteUser)

export default router
