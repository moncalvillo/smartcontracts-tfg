
import {Router} from 'express';
import userRouter from'./UserRouter';
import fabricRouter from'./FabricRouter';
import authenticateToken from '../middlewares/authenticateToken';

const router = Router();


router.use('/fabric', fabricRouter);

router.use('/users', userRouter);

export default router;


