import {Router} from 'express';
import authController from '../controllers/AuthController';


const router = Router();

router.post("/google", authController.google);
router.post("/facebook", authController.facebook);

export default router;