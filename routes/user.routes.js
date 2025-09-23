import { Router } from "express";
import { updateUser } from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const userRoutes = Router();


userRoutes.patch('/update', authenticate, authorize(['user','agent']), updateUser)

export default userRoutes;