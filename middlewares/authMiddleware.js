import User from "../models/user.js"
import jwt from 'jsonwebtoken'


export const authenticate = async (req, res, next) => {


    const token = req.headers['authorization'].split(' ')[1]
    if (!token) {
        res.json({
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
           
            const userData = await User.findOne({ email: decodedToken.email }).select('_id status')
          
            if (!userData || userData.status !== 'active') {
                res.json({
                    status: false,
                    message: "No such user found",
                    data: null
                })
            } else {
                req.userId = userData._id
                next()
            }
        }
    }
   
}