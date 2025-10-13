import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";

const authRoutes = Router();

authRoutes.post('/register', [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty(),
    body('email').notEmpty(),
    body('password').notEmpty()
] ,register);

authRoutes.post('/login', [
    body('email').notEmpty(),
    body('password').notEmpty()
] ,login)

export default authRoutes;

