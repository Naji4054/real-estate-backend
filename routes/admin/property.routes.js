import { Router } from "express";
import { getProperty } from "../../controllers/admin/property.controller.js";

const propertyRoutes = Router()
propertyRoutes.get('/property',getProperty)

export default propertyRoutes;