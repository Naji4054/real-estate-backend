import { Router } from "express";
import { fileUpload } from "../controllers/test.controller.js";
import upload from "../middlewares/test.middleware.js";

const testRoutes = Router();

testRoutes.post('/upload',upload, fileUpload);

export default testRoutes ;