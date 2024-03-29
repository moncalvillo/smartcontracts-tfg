import {Router} from 'express';
import FabricController from '../controllers/FabricController';
import authenticateToken from '../middlewares/authenticateToken';

const router = Router();


router.get('/allExpenses', FabricController.getAllExpenses);


router.use(authenticateToken);

router.post('/test', FabricController.test);
router.post('/enroll', FabricController.enrollAdmin);
router.post('/expense', FabricController.createExpense);
router.get('/expense', FabricController.readExpense);
// router.post('/request', FabricController.request);
router.get('/expenses', FabricController.getExpenses);
// router.post('/init', FabricController.init);
router.post('/update', FabricController.updateExpense);


export default router;