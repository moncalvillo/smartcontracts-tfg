import {Router} from 'express';
import FabricController from '../controllers/Controller';
import authenticateToken from '../middlewares/authenticateToken';

const router = Router();

router.post('/enroll', FabricController.enrollAdmin);
router.post('/expenseCreate', FabricController.createExpense);
router.post('/expenseRead', FabricController.readExpense);
router.get('/getUsers', FabricController.getRegisteredUsers);

export default router;