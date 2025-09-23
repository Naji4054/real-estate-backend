import { validationResult } from "express-validator"
import multer from "multer";

export const fileUpload = ( req, res, next ) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({
                status: false,
                message: "validation error",
                data: nul
            })
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