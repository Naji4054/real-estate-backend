import { Router } from "express";
import { getProperty, getPropertyView } from "../../controllers/admin/property.controller.js";

const adminPropertyRoutes = Router()

adminPropertyRoutes.get('/',getProperty)

adminPropertyRoutes.get('/view/:id', getPropertyView)

export default adminPropertyRoutes;