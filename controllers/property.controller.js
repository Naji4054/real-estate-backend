import { validationResult } from "express-validator"
import Property from "../models/property.js"

export const getProperty =  async ( req ,res, next ) => {
    try {
        const data = await Property.find({})
        res.status(201).json({
            status: true,
            message :" listing all properties",
            data 
        })
    } catch (error){
        console.log(error)
        res.status(500).json({
            status: false,
            message: "internal server error",
            data: null
        })
    }
}

export const addProperty = async (req, res, next) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.status(400).json({
                status: false,
                message: 'Validation error',
                data: null
            })
        } else {
            const { title, description, price, taxRate, location, category, locationPoint, details, amenities } = req.body



            const newEntry = new Property({
                title, 
                description, 
                price, 
                taxRate, 
                location, 
                category, 
                locationPoint, 
                details, 
                amenities
            })

            await newEntry.save()
            
            res.status(200).json({
                status: true,
                message: 'property created successfully',
                data: null
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: 'Internal server error',
            data: null
        })
    }
}

export const propertyInfo = async( req, res, next ) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({
                status: false,
                message: "validation error",
                data: nul
            })
                  
        } else {
      
            const { title, description, price, taxRate, location, category, property } = req.body
            
            const newProperty =  new Property({
                title,
                description,
                price,
                taxRate,
                location,
                category,
                property
            })
            await newProperty.save()

            res.status(200).json({
                status: true,
                message: "property info added",
                data: {
                    propertyId: newProperty._id
                }
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


export const details = async( req, res, next ) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({
                status: false,
                message: "validation error",
                data: nul
            })
                  
        } else {
      
            let updatedDetails 
            const {propertyId , details} = req.body;
           if(!propertyId) {
            res.status(400).json({
                status: false,
                message: "invalid property ID",
                data: null
            })
           } else {
                try {
                    updatedDetails =  await Property.findByIdAndUpdate(propertyId, {details, completed: true }).exec()
                    res.status(200).json({
                        status: true,
                        message: "updated details",
                        data: {
                            propertyId: updatedDetails._id
                        }
                    })
                } catch (error) {
                    console.log(error)
                    res.status(400).json({
                        status: false,
                        message: "failed to update details",
                        data: null
                    })
                }
           }

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


export const location = async( req, res, next ) => {
    try {
        console.log(req.body)
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({
                status: false,
                message: "validation error",
                data: null
            })
                  
        } else {
            let updatedLocation;
            const {propertyId , latitude, longitude } = req.body
            
            try {
                updatedLocation = await Property.findByIdAndUpdate(propertyId, {locationPoint: { latitude, longitude}}).exec()
                
                res.json({
                    status: true,
                    message: "location added",
                    data: {
                        propertyId: updatedLocation?._id
                    }
                    
                })
            } catch (error) {
                console.error(error, 'err')
                res.status(400).json({
                    status : false,
                    message: "failed to update location",
                    data: null
                })
            }
            
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



export const media = async( req, res, next ) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({
                status: false,
                message: "validation error",
                data: null
            })
                  
        } else {
      
            const { propertyId } = req.body

            let media = []
            
            Object.values(req.files).map(file=> {
                media.push(file[0].path)
                
            })

           let updatedProperty
           try {
            
                updatedProperty = await Property.findByIdAndUpdate(propertyId, { media }, { new: true }).exec()
                if (!updatedProperty) {
                    res.status(404).json({ 
                        status: false,
                        message: 'No such property found',
                        data: null
                    })
                } else {
                    console.log(updatedProperty, 'prop')
                    res.status(200).json({
                        status: true,
                        message: " added media files successfully",
                        data: {
                            propertyId: updatedProperty?._id
                        }
                    })
                }
           } catch (error) {
            console.log(error) 
            res.status(400).json({
                status: false,
                message: " fialed to add media files",
                data: null
            })
            }

            
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

