import { Router } from "express";
import { fileUpload, testEmail } from "../controllers/test.controller.js";
import upload from "../middlewares/multer.js";


const testRoutes = Router();

testRoutes.post('/upload',upload, fileUpload);
testRoutes.post('/mail',testEmail)

export default testRoutes ;