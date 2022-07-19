import {Router} from 'express';
import FabricController from '../controllers/FabricController';
import authenticateToken from '../middlewares/authenticateToken';

const router = Router();


router.use(authenticateToken);

router.post('/test', FabricController.test);
router.post('/enroll', FabricController.enrollAdmin);
router.post('/expense/new', FabricController.createExpense);
router.post('/expenseRead', FabricController.readExpense);
// router.post('/request', FabricController.request);
router.get('/expenses', FabricController.getExpenses);
// router.post('/init', FabricController.init);
router.get('/allExpenses', FabricController.getAllExpenses);
router.post('/update', FabricController.updateExpense);


export default router;