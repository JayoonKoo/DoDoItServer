import express from 'express';
import authController from '../../controller/auth/authController';
import { isAuth } from '../../middlewares/auth';

const router = express.Router();

router.post('/signup', authController.signUp); // /auth/signup
router.post('/login', authController.login); // auth/login
router.get('/me', isAuth, authController.me); // auth/me

export default router;
