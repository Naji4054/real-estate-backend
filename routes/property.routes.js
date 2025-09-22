import { Router } from "express";
import { addProperty, getProperty } from "../controllers/property.controller.js";

const propertyRoutes = Router()
propertyRoutes.get('/properties', getProperty),
propertyRoutes.post('/properties/add',addProperty)

export default propertyRoutes;