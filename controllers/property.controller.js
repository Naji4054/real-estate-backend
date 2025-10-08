import { validationResult } from "express-validator"
import Property from "../models/property.js"
import { sendMail } from "../config/emailConfig.js";
import { getEnquiryHtml } from "../templates/enquiryEmail.js";

export const listProperty =  async ( req ,res, next ) => {
    try {
        
        const { filters, searchValue, page = 1, limit = 10 } = req.body
       
        const skipValue = (page - 1 )* limit
        const filterQuery = {}

        if (searchValue && searchValue.trim() !== '') {
            filterQuery.$or = [
                { title: { $regex: searchValue.trim(), $options: 'i' } }, // Case-insensitive search on title
                { category: { $regex: searchValue.trim(), $options: 'i' } } // Case-insensitive search on category
            ]
        }
   // --- 2. CHECKBOX FILTERS (Property Type, Location, Sell/Rent) ---

        // Property Type (maps to 'category' in model)
        if (filters?.category && filters.category.length > 0) {
            filterQuery.category = { $in: filters.category };
        }

        // Location
        if (filters?.location && filters.location.length > 0) {
            filterQuery.location = { $in: filters.location };
        }

        // Sell / Rent (maps to 'property' in model)
        if (filters?.property && filters.property.length > 0) {
            filterQuery.property = { $in: filters.property };
        }


        // --- 3. PRICE RANGE FILTER ---
        if (filters?.price && filters.price.length === 2) {
            const [minPrice, maxPrice] = filters.price;
            // Filter by the exact price field
            filterQuery['price.priceExact'] = { 
                $gte: minPrice, 
                $lte: maxPrice 
            };
        }


        // --- 4. AMENITIES FILTER ---
        if (filters?.amenities && filters.amenities.length > 0) {
            // For amenities, we need an AND condition for each selected amenity
            // For example, if 'furnished' and 'backyard' are selected, 
            // the property must have both amenities: { 'amenities.furnished': true, 'amenities.backyard': true }
            
            const amenityConditions = filters.amenities.map(amenity => ({
                [`amenities.${amenity}`]: true
            }));

            // Use $and to combine existing $or search with new amenity conditions
            // Or just add them directly if no $or search is present
            if (filterQuery.$or) {
                // If $or exists (from search), we wrap the whole query in $and
                filterQuery.$and = [
                    { $or: filterQuery.$or },
                    ...amenityConditions
                ];
                delete filterQuery.$or; // Remove the original $or condition
            } else {
                // Otherwise, simply add the amenity conditions to the main filterQuery
                Object.assign(filterQuery, ...amenityConditions);
            }
        }
        
        console.log('Final Filter Query:', filterQuery);


        const data = await Property.find(filterQuery)
        .sort({ createdAt: -1}).skip(skipValue).limit(limit)

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
            console.log(price, 'price')
            
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
            const {propertyId , details, amenities} = req.body;
            console.log(propertyId, 'property Id')
           if(!propertyId) {
            res.status(400).json({
                status: false,
                message: "invalid property ID",
                data: null
            })
           } else {
                try {
                    updatedDetails =  await Property.findByIdAndUpdate(propertyId ,{details, amenities, completed: true }).exec()
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
        console.log(errors,"errors here")
        if(!errors.isEmpty()) {
            res.status(400).json({
                status: false,
                message: "validation error",
                data: null
            })
                  
        } else {
            let updatedLocation;
            
            const {propertyId, locationPoint} = req.body
            console.log(req.body,'loc point')
            
            try {
                updatedLocation = await Property.findByIdAndUpdate(propertyId,{locationPoint} ).exec()
                console.log(updatedLocation,'updated loc')
                res.status(200).json({
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
            console.log(req.files, 'files')
            
            Object.values(req.files).map(file=> {
                const assetName = file[0].filename
                // console.log(file[0].originalname,'media')
                media.push(`/media/${assetName}`)
                
                
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



export const emailEnquiry =  async(req, res, next) => {
    try {
        console.log(req.body)
        const errors = validationResult(req);
        console.log(errors,'errors here')
        if(!errors.isEmpty()){
            res.status(400).json({
                status: false,
                message: "validation failed , try again!",
                data: null
            })
        } else {
            const {propertyId} = req.body
            const  userEmail = req.userEmail

            const propertyData = await Property.findById(propertyId)

            const subject = `New Enquiry on ${propertyData.title}`

            const htmlBody = getEnquiryHtml(propertyData, userEmail, subject )
        
            const info = await sendMail(subject, htmlBody); 
            res.status(200).json({
                status: true,
                message: "Test email sent successfully!"
            });

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: "Internal server error",
            data: null
        })
    }
}

export const search = async (req, res, next)=> {
    try {
        
    } catch (error) {
        
    }
}