import { LatestData } from "../models/latest.js"

 export const getLatest = (req, res, next) =>{
    if(!LatestData){
        res.status(400).json({
            status: false,
            message: "cannot find feature data",
            data: null
        })
    }
    else {
        res.json({
            latestDatas : LatestData
        })
    }

}