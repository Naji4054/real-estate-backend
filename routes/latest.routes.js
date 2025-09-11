import { Router } from "express";
import { getLatest } from "../controllers/latest.controller.js";

const latestRoutes = Router();
latestRoutes.get('/data',getLatest);

export default latestRoutes;