import { validationResult } from "express-validator"
import jwt from 'jsonwebtoken'
import User from "../models/user.js"

export const updateUser = async(req, res, next ) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).json({
                status : false ,
                message : "validation error",
                data: null
            })
        } else {
            const userId = req.userId
            const updatedUser = await User.findByIdAndUpdate(userId, req.body )
            if (!updatedUser) {
                res.status(400).json({
                    message: 'someting went wrong'
                })
            } else {
                res.status(200).json({
                    message: 'update successfull'
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status : false,
            message : "internal server error",
            data: null
        })
    }
}