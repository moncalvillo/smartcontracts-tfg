import {Router} from 'express';
import DatabaseController from '../controllers/DatabaseController';
import authenticateToken from '../middlewares/authenticateToken';

const router = Router();

router.post('/login', /* middlewares, */ DatabaseController.login);
router.get('/', DatabaseController.getAll);
router.post('/new', DatabaseController.create);
router.delete('/:id', DatabaseController.delete)
router.get('/user', DatabaseController.getUser);

router.use(authenticateToken);

router.get('/projects', DatabaseController.getProjects);
router.get('/types', DatabaseController.getTypes);
router.get('/users', DatabaseController.getUsers);
router.post('/projects', DatabaseController.createProject);
router.post('/types', DatabaseController.createType);
router.delete('/projects/:id', DatabaseController.deleteProject);
router.delete('/types/:id', DatabaseController.deleteType);


export default router;