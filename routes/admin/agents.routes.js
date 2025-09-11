import { Router } from "express";
import { getOrder } from "../../controllers/admin/order.controller.js";

const agentRoutes = Router();

agentRoutes.get('/agents', getOrder)

export default agentRoutes;