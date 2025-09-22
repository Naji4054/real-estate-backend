import { Router } from "express";
import { updateUser } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const userRoutes = Router();


userRoutes.patch('/update', authenticate, updateUser)

export default userRoutes;