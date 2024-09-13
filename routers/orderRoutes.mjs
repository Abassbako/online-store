import { 
    createOrder,
    searchOrder,
    updateOrder,
    cancelOrders,
    myOrders,
} from "../controllers/orderControllers.mjs";
import { Router } from "express";

const router = Router();

router.post('/create', createOrder);
router.get('/search/:_id', searchOrder);
router.put('/update/:_id', updateOrder);
router.delete('/delete/:_id', cancelOrders);
router.get('/', myOrders);

export default router;