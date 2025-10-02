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

        const { title, description, userEmail } = req.body;
            const subject = `New Property Inquiry: ${title}`;

            const htmlBody = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${subject}</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            line-height: 1.6; 
                            color: #333333;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            padding: 20px;
                            border: 1px solid #dddddd;
                            border-radius: 8px;
                            background-color: #ffffff;
                        }
                        .header {
                            background-color: #007bff; /* Example Primary Color */
                            color: #ffffff;
                            padding: 15px;
                            text-align: center;
                            border-radius: 8px 8px 0 0;
                        }
                        .content {
                            padding: 20px 0;
                        }
                        .details-box {
                            border: 1px solid #eeeeee;
                            padding: 15px;
                            margin-top: 15px;
                            background-color: #f9f9f9;
                            border-radius: 4px;
                        }
                        .footer {
                            margin-top: 20px;
                            text-align: center;
                            font-size: 0.9em;
                            color: #999999;
                        }
                        hr {
                            border: 0;
                            border-top: 1px solid #eeeeee;
                            margin: 20px 0;
                        }
                        ul {
                            list-style: none;
                            padding: 0;
                            margin: 0;
                        }
                        li {
                            margin-bottom: 8px;
                        }
                        strong {
                            color: #007bff;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>New Property Inquiry Received</h2>
                        </div>
                        
                        <div class="content">
                            <p>Dear Admin,</p>
                            <p>A potential client has used your website's **Email Inquiry** feature to express interest in a specific property. Please follow up promptly.</p>
                            
                            <hr>

                            <h3>Client Details</h3>
                            <p>This message was initiated by a user with the email address:</p>
                            <ul>
                                <li><strong>Client Email:</strong> <a href="mailto:${userEmail}">${userEmail}</a></li>
                            </ul>

                            <hr>
                            
                            <h3>Property Details</h3>
                            <div class="details-box">
                                <ul>
                                    <li><strong>Property Title:</strong> ${title}</li>
                                    <li><strong>Description Snippet:</strong> ${description}</li>
                                    <li><strong>Inquiry Source:</strong> Property Finder Website (Mail Button)</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="footer">
                            <p>This email was automatically generated by Property Finder application and sent via Ethereal for testing purposes. | Do Not Reply.</p>
                        </div>
                    </div>
                </body>
                </html>
            `;
       //pass the subject and html body to the child (emialConfig)
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

