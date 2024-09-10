import { createUser } from "../controllers/userControllers.mjs";

import { Router } from "express";

const router = Router();

router.post('/create', createUser)

export default router;