import { Router } from "express";
import { getAgents } from "../../controllers/admin/agents.controller.js";

const agentRoutes = Router();

agentRoutes.get('/agents', getAgents)

export default agentRoutes;