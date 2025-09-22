import Property from "../models/property"

export const getProperty =  async ( req ,res, next ) => {
    try {
        const data = await Property.find({})
        res.status(201).json({
            stats: true,
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

