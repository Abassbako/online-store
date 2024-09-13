import { 
    createUser, 
    loginUser,
    searchUser,
    updateUser,
    deleteUser,
    allUsers,
} from "../controllers/authControllers.mjs";

import { Router } from "express";

const router = Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/search/:userId', searchUser);
router.put('/update/:userId', updateUser);
router.delete('/delete/:userId', deleteUser);
router.get('/', allUsers);

export default router;