import { Request, Response } from 'express';
import signUpReq from './type/signUp';
import User from '../../model/user';
import authService from '../../service/authService';

const authController = {
  signUp: async (req: Request, res: Response) => {
    const { email, nickname, password }: signUpReq = req.body;
    try {
      const user = new User({ email, nickname, password });
      authService.signUp(user);
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: 'server error' });
    }
  },
};

export default authController;
