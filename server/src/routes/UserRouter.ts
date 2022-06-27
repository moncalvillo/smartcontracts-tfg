import {Router} from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.post('/login', /* middlewares, */ UserController.login);
router.get('/', UserController.getAll);
router.post('/new', UserController.create);
router.delete('/:id', UserController.delete)

export default router;