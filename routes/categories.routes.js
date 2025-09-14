import { Router } from "express";
import { getCategories } from "../controllers/categories.controller.js";

const categoriesRoutes = Router();
categoriesRoutes.get('/data',getCategories);

export default categoriesRoutes