import express from 'express';
import authController from '../../controller/auth/authController';

const router = express.Router();

router.post('/signup', authController.signUp); // /auth/signup
router.post('/login', authController.login); // auth/login

export default router;
