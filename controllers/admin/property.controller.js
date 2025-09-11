import { propertyData } from "../../models/admin/property.js"

export const getProperty = async (req, res, next) => {
try {
    if(!propertyData || propertyData.length === 0 ){
        res.status(400).json({
            status: false,
            message: "No properties",
            data: null
        })
    } else {
        res.json({
            data: propertyData
        })
    }
} catch (err) {
    res.status(500).json({
        status: false,
        message: 'Internal server error'
    })
}

}

export const getPropertyView = async (req, res, next) => {

    const { id } = req.params
  console.log(id)

  const prop = propertyData.find(item=> item.id === id)


  res.json({
    data: prop 
  })
}