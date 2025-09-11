import { Router } from "express";
import { getOrder } from "../../controllers/admin/order.controller.js";

const orderRoutes = Router();

orderRoutes.get('/orders', getOrder)

export default orderRoutes;