import Property from "../models/property"

export const getProperty =  async ( req ,res, next ) => {
    try {
        const data = await Property.find({})
        res.status(201).json({
            stats: true,
            message :" listing all properties",
            data 
        })
    } catch {
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
            const { image, title, bedroom, washroom, area, category } = req.body



            const newEntry = new Latest({
                image,
                title,
                bedroom,
                washroom,
                area,
                category
            })
            await newEntry.save()
            
            res.status(200).json({
                status: true,
                message: 'Latest created successfully',
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