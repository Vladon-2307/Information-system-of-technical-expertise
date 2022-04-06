const ApiError = require('../error/ApiError')
const {Claim} = require('../models/models')
const uuid = require('uuid')
const fs = require("fs")
const path = require("path")

class ClaimController {

    async get(req, res, next) {
        try {
            const {id} = req.query
            if (id) {
                return res.json(await Claim.findByPk(id))
            }
            return res.json(await Claim.findAll())
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async post(req, res, next) {
        const {name, status, userId} = req.body
        const {img} = req.files
        if (!name || !status || !userId || !img) {
            return next(ApiError.badRequest('Поля name, status, userId, img не должны быть пустыми'))
        }
        let fileName = uuid.v4() + ".png"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        try {
            const claim = await Claim.create({name, status, userId, img: fileName})
            return res.json(claim)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async put(req, res, next) {
        try {
            const {id} = req.query
            if (!id) {
                return next(ApiError.badRequest('Поле ID не должны быть пустыми'))
            }
            const {managerId, adminId} = req.body
            if(managerId){
                return res.json(await Claim.update({managerId}, {where: {id}}))
            }
            else if(adminId){
                return res.json(await Claim.update({adminId}, {where: {id}}))
            }else{
                return next(ApiError.badRequest('Поля для обновления не заданы'))
            }
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async delete(req, res, next) {
        try {
            const {id} = req.query
            if (!id) {
                return next(ApiError.badRequest('Поле ID не должны быть пустыми'))
            }
            const claim = await Claim.findByPk(id)
            if (claim) {
                fs.unlinkSync(path.resolve(__dirname, '..', 'static', claim.img))
            }

            res.json(await Claim.destroy({where: {id}}))
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }


    }
}

module.exports = new ClaimController()