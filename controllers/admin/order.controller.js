import { orderData } from "../../models/admin/order.js";

export const getOrder = (req, res, next ) => {

if (!orderData){
    res.status(400).json({
        status: false,
        message: "cannot get order data",
        data: null
    })
} else {
    res.json({
        data: orderData
    })
}
};