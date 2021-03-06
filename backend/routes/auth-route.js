const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth-controller')

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

router.post('/refresh-token', AuthController.refreshToken)

router.post('/logout', AuthController.logout)

router.post('/change-role', AuthController.changeRole)

router.post('/delete-user',AuthController.deleteUser)

module.exports = router
