import User from "../models/user.js"
import jwt from 'jsonwebtoken'


export const authenticate = async (req, res, next) => {


    const token = req?.headers['authorization']?.split(' ')[1]
    console.log(token)

    if (!token) {
        res.status(401).json({
            status: false,
            message: "No token found, please login",
            data: null
        })
    } else {
        let decodedToken  = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decodedToken) {
            res.json({
                status: false,
                message: "Invalid token, Please login",
                data: null
            })
        } else {
           
            const userData = await User.findOne({ email: decodedToken.email })
          
            if (!userData) {
                res.status(404).json({
                    status: false,
                    message: "No such user found",
                    data: null
                })
            } else {
                req.userId = userData._id
                req.userRole = userData.role
                req.userEmail = userData.email
                next()
            }
        }
    }
   
}

export const authorize = (authorizedRole) => {
   
    return (req, res, next) => {
        const userRole = req.userRole ;
        const user = req.userId
        console.log(userRole,'role'),
        console.log(user,'user')
        if(!user || !userRole) {
            res.status(400) .json({
                status: false ,
                message: " user not found" ,
                data: null
            })
        } else {
            const permission = authorizedRole.includes(userRole);
            if (!permission) {
                res.status(400).json({
                    status : false,
                    message : "unauthorized access",
                    data: null
                })
            } else {
                next()
            }
        }
    }
}