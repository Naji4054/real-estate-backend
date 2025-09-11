import { Router } from "express";
import { getData } from "../controllers/service.controller.js";


const serviceRouter = Router()

serviceRouter.get('/data', getData)

export default serviceRouter;