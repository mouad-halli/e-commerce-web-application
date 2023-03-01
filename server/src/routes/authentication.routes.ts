import { Router } from 'express'
import authController from '../controllers/authentication.controllers'

import { verifyAuthentication } from '../middleware/verifyAccessToken.middleware'
import { verifyRefreshToken } from '../middleware/verifyRefreshToken.middleware'

const router = Router()

router.post('/register', authController.register)

router.post('/login', authController.login)

router.get('/logout', verifyAuthentication, authController.logout)

router.get('/refresh-token', verifyRefreshToken, authController.refreshAccessToken)

export default router