
import {Router} from 'express';
import controller from '../controllers/Controller';

const router = Router();


router.post('/form', /* middlewares, */ controller.submitForm);

export default router;