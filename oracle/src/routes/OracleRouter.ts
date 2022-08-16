import {Router} from 'express';
import controller from '../controller/Controller';

const router = Router();

router.post('/test', controller.test);

export default router;
