const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/singup', userController.singup)
router.post('/singin', userController.singin)
router.get('/auth',authMiddleware('ALL'), userController.isAuth)

module.exports = router