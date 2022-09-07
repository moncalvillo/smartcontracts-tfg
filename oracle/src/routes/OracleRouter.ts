
import {Router} from 'express';
import OracleController from '../controllers/OracleController';

const router = Router();


  
router.use('/test', OracleController.test);
router.use('/resolve', OracleController.resolve);

export default router;


