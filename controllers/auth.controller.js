import { validationResult } from "express-validator"
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

                // create a hash value for password 
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(req.body.password, salt);

                const newEntry = new User({
                    firstName, 
                    lastName, 
                    email, 
                    password : hashPassword, 
                    status, 
                    role, 
                    dob, 
                    country, 
                    phone
                })
                await newEntry.save()
                

                const secretKey = process.env.JWT_SECRET_KEY
                const expiresIn = process.env.EXPIRES_IN

                console.log(secretKey, expiresIn)
                // sign a new jwt token and send with response
                const token = jwt.sign({ role, status, email }, secretKey, { expiresIn }  )


                res.status(200).json({
                    stauts: true,
                    message: "register successfull",
                    data: null,
                    access_token: token
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

export const login =  async (req, res, next) => {
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
            const {email, password} = req.body;
            const user = await User.findOne({email})
            if(!user) {
                res.status(404).json({
                    status: false,
                    message: "user not found",
                    data: null
                })
            }else {
               
                const passwordMatch = await bcrypt.compare(req.body.password, user.password);
                if(!passwordMatch){
                    res.status(404).json({
                        status : false,
                        message: " invalid password",
                        data: null
                    })
                } else {
                    res.status(200).json({
                        status: true,
                        message: 'login successfull',
                        data: user
                    })
                }
               
            }
        }
    } catch (error){
        console.log(error);
        res.status (500).json ({
            status: false,
            message: " internal server error",
            data: null

        })
        
    }
}