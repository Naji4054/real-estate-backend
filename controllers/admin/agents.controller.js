import { manageAgents } from "../../models/admin/agents.js";

export const getAgents = (req, res, next ) => {

if (!orderData){
    res.status(400).json({
        status: false,
        message: "cannot get order data",
        data: null
    })
} else {
    res.json({
        data: manageAgents
    })
}
};