import { 
    createUser, 
    loginUser
} from "../controllers/userControllers.mjs";

import { Router } from "express";

const router = Router();

router.post('/create', createUser);
router.post('/login', loginUser);

export default router;