import { FeatureData } from "../models/features.js"

export  const getFeature = (req, res, next ) => {
    if(!FeatureData){
        res.status(400).json({
            status: false,
            message: "cannot get features",
            data: null

        })
    } else {
        res.json({
            data: FeatureData,
            accessToken : "abcd"
        })
    }
}
