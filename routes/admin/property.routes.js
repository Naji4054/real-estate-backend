import { Router } from "express";
import { getProperty, getPropertyView } from "../../controllers/admin/property.controller.js";

const propertyRoutes = Router()

propertyRoutes.get('/',getProperty)

propertyRoutes.get('/view/:id', getPropertyView)

export default propertyRoutes;