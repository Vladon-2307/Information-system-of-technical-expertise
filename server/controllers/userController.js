const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const {User} = require('../models/models')

const generateJwt = (id, role) => {
    return jwt.sign({id, role},
        process.env.JWT_KEY,
        {expiresIn: '24h'})
}

class UserController{
    async singup(req, res, next){
        try {
            const {login, password, role} = req.body
            if(!login || !password){
                return next(ApiError.badRequest('Некоректный login или password'))
            }
            const candidate = await User.findOne({where: {login}})
            if(candidate){
                return next(ApiError.badRequest('Пользователь с таким логином уже существует'))
            }
            const hasPassword = await bcrypt.hash(password, 5)
            const user = await User.create({login, role, password: hasPassword})
            const token = generateJwt(user.id, user.role)
            res.json({token})
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async singin(req, res, next){
        try {
            const {login, password} = req.body
            if(!login || !password){
                return next(ApiError.badRequest('Некоректный login или password'))
            }
            const user = await User.findOne({where: {login}})
            if(!user){
                return next(ApiError.badRequest('Пользователь с таким логином не найден'))
            }
            if(!bcrypt.compareSync(password, user.password)){
                return next(ApiError.badRequest('Неверный пароль'))
            }
            const token = generateJwt(user.id, user.role)
            res.json({token})
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async isAuth(req, res){
        const token = generateJwt(req.user.id, req.user.role)
        res.json({token})
    }
}

module.exports = new UserController()