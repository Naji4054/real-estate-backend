import { Router } from "express";
import {getFeature} from "../controllers/features.controller.js"

const featuresRoutes = Router();

featuresRoutes.get('/data', getFeature)
 export default featuresRoutes;