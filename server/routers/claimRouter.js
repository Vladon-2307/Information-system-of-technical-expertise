const Router = require('express')
const router = new Router()
const claimController = require('../controllers/claimController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware('ALL'), claimController.get)
router.post('/', authMiddleware('ALL'), claimController.post)
router.put('/', authMiddleware('MANAGER'), claimController.put)
router.delete('/', authMiddleware('ADMIN'), claimController.delete)

module.exports = router