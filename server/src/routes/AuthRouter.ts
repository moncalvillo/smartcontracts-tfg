import {Router} from 'express';
import authController from '../controllers/AuthController';
import passport from 'passport';

const router = Router();

router.post("/google", authController.google);
router.get("/facebook", passport.authenticate('facebook-token'), authController.facebook);

export default router;