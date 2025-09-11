import { ServiceData } from "../models/service.js"

export const getData = (req, res, next) => {

    if (!ServiceData) {
        res.status(400).json({
            status: false,
            message: 'Cannot get service data',
            data: null
        })
    } else {
        res.json({
            data: ServiceData
        })
    }
  
  
}