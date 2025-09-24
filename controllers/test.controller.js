import { body, validationResult } from "express-validator"

import Property from "../models/property.js";

export const fileUpload = ( req, res, next ) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({
                status: false,
                message: "validation error",
                data: nul
            })
            // const newUser = new User({
            //     profileImage: '/uploads/afjsldkjf.png'
            // })
            
        }else {
            res.json({ message: 'test'})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false ,
            message: "Internal server error",
            data: null
        })
    }
}


export const basicInfo = async( req, res, next ) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({
                status: false,
                message: "validation error",
                data: nul
            })
                  
        } else {
      
            const { title, description, price, taxRate } = req.body
            
            const newProperty = await new Property({
                title,
                description,
                price,
                taxRate
            }).save()

            res.json({
                status: true
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false ,
            message: "Internal server error",
            data: null
        })
    }
}