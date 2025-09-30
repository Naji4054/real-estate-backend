import { body, validationResult } from "express-validator"

import Property from "../models/property.js";
import { sendMail } from "../config/emailConfig.js";

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

export const testEmail = async( req, res, next ) => {
    try {

        const {title , description, userEmail, } = req.body
        const subject = `New Inquiry: ${title}`;
        const htmlBody = `
            <p>Dear Admin (Test Email),</p>
            <p>You have a new property inquiry from (${userEmail}):</p>
            <hr>
            <h3>Property Details</h3>
            <ul>
                <li><strong>Property Title:</strong> ${title}</li>
                <li><strong>Property Description:</strong> ${description}</li>
            </ul>
            <hr>
            <p>This email was sent via Ethereal for testing purposes.</p>
        `;
        const info = await sendMail(subject, htmlBody); 
        res.status(200).json({
            status: true,
            message: "Test email sent successfully!"
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false ,
            message: "Internal server error",
            data: null
        })
    }
}

