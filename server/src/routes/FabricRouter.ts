import {Router} from 'express';
import FabricController from '../controllers/Controller';
import authenticateToken from '../middlewares/authenticateToken';

const router = Router();

router.post('/form', /* middlewares, */ FabricController.submitForm);
router.post('/enroll', FabricController.enrollAdmin);
router.post('/query', FabricController.firstQuery);
router.get('/test', authenticateToken, FabricController.test);
router.get('/getUsers', FabricController.getRegisteredUsers);

export default router;