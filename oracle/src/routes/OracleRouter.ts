
import {Router} from 'express';
import OracleController from '../controllers/OracleController';
import verifyRole from '../middlewares/verifyRole';

const router = Router();


router.use(verifyRole)
router.use('/test', OracleController.test);
router.post('/resolve', OracleController.resolve);
router.get('/pending', OracleController.getPending);
router.get('/count', OracleController.countPending);

export default router;


