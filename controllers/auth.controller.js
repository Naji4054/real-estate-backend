import { validationResult } from "express-validator"
import User from "../models/user.js";

export const register = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors. isEmpty()){
            console.log(errors.errors)
            let message = ''

            errors.errors.map(item=> message += item.path + ' is ' + item.msg )
            
            res.status(400).json({
                status: false,
                message,
                data: null
            })
        }else {
            const { firstName, lastName, email, password, status, role, dob, country, phone } = req.body;
            const existingUser = await User.findOne({ email })
            if (existingUser) {
                res.status(400).json({
                    stauts: false,
                    message: " user already exists",
                    data: null
                })
            } else {
                const newEntry = new User({
                    firstName, 
                    lastName, 
                    email, 
                    password, 
                    status, 
                    role, 
                    dob, 
                    country, 
                    phone
                })
                await newEntry.save()

                res.status(200).json({
                    stauts: true,
                    message: "register successfull",
                    data: null
                })
            }
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "internal server error",
            data: null
        })
    }
}

export const login = (req, res, next) => {
    try {
        
    } catch  {
        
    }
}