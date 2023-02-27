import { Router } from 'express'
import userControllers from '../controllers/users.controllers'

const router  = Router()

router.get('/', userControllers.getUser)

router.post('/', userControllers.createUser)

router.put('/', userControllers.updateUser)

router.delete('/', userControllers.deleteUser)

export default router