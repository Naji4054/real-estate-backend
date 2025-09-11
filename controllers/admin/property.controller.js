import { propertyData } from "../../models/admin/property.js"

export const getProperty =(req, res, next) => {
    if(!propertyData){
        res.status(400).json({
            status: false,
            message: "cannot get property data",
            data: null
        })
    } else {
        res.json({
            data: propertyData
        })
    }

}