import { Router } from 'express';

import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import authMiddleware from './middlewares/authMiddleware';

const router = Router();

router.post('/login', AuthController.authenticate);

router.get('/users', authMiddleware, UserController.index);
router.post('/users', UserController.store);

export default router;
