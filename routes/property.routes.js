import { Router } from "express";
import { addProperty, details, listProperty, location, media, propertyInfo } from "../controllers/property.controller.js";
import upload from "../middlewares/multer.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { body } from "express-validator";

const propertyRoutes = Router()

propertyRoutes.get('/list', listProperty),

propertyRoutes.use(authenticate)
propertyRoutes.post('/add',addProperty)
propertyRoutes.post('/add/info',propertyInfo)
propertyRoutes.post('/add/media',upload,media)
propertyRoutes.post('/add/location' ,[
    body('propertyId').notEmpty(),
    body('locationPoint').notEmpty(),
   
], location)
propertyRoutes.post('/add/details',details)

export default propertyRoutes;