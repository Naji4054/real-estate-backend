import { Router } from "express";
import { addLatest, deleteLatest, getAllLatest } from "../controllers/latest.controller.js";
import { body } from "express-validator";

const latestRoutes = Router();

latestRoutes.get('/list',getAllLatest);

latestRoutes.post('/add', [
    body('image').not().isEmpty(),
    body('title').not().isEmpty()
] ,addLatest)

latestRoutes.delete('/delete/:id',deleteLatest)
export default latestRoutes;