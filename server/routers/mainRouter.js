const Router = require('express')
const router = new Router()
const claimRouter = require('./claimRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/claim', claimRouter)

module.exports = router