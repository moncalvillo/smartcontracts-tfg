
import {Router} from 'express';
import serverRouter from'./DatabaseRouter';
import fabricRouter from'./FabricRouter';
import FabricController from '../controllers/FabricController';
import dotenv from 'dotenv';
import authRouter from './AuthRouter';

dotenv.config();
const router = Router();


  
router.use('/fabric', fabricRouter);
router.use('/server', serverRouter);
router.use('/auth', authRouter);
router.post('/init', FabricController.init);

export default router;


