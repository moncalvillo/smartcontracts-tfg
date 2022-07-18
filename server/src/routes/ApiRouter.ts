
import {Router} from 'express';
import serverRouter from'./DatabaseRouter';
import fabricRouter from'./FabricRouter';
import FabricController from '../controllers/FabricController';
const router = Router();


router.use('/fabric', fabricRouter);
router.use('/server', serverRouter);
router.post('/init', FabricController.init);

export default router;


