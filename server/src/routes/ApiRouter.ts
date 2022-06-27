
import {Router} from 'express';
import controller from '../controllers/Controller';
import userRouter from'./UserRouter';
const router = Router();


router.post('/form', /* middlewares, */ controller.submitForm);
router.post('/enroll', controller.enrollAdmin);
router.post('/register', controller.registerUser);

router.use('/users', userRouter);

export default router;