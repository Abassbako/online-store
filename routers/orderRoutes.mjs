import { 
    createOrder

} from "../controllers/orderControllers.mjs";
import { Router } from "express";

const router = Router();

router.post('/create', createOrder)

export default router;