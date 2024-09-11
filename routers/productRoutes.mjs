import { 
    newProducts,
    searchProducts,
    updateProducts,
    deleteProducts,
   
} from "../controllers/productControllers.mjs";
import { Router } from "express";

const router = Router();

router.post('/create', newProducts);
router.get('/search/:_id', searchProducts);
router.put('/update/:id', updateProducts);
router.delete('/delete/:id', deleteProducts);

export default router;