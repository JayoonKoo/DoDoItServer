import express from 'express';
import authController from '../../controller/auth/authController';
import { isAuth, isHasRefresh } from '../../middlewares/authMiddleware';

const router = express.Router();

router.post('/signup', authController.signUp); // /auth/signup
router.post('/login', authController.login); // auth/login
router.get('/me', isAuth, authController.me); // auth/me
router.get('/refresh', isHasRefresh, authController.refresh); // auth/refresh

export default router;
