import { Request, Response } from 'express';
import signUpReq from './type/signUp';
import User from '../../model/user';
import authService from '../../service/authService';
import AuthException, { AuthExceptionType } from '../../service/exception/AuthException';
import Res from '../../lib/Res';

const authController = {
  signUp: async (req: Request, res: Response) => {
    const { email, nickname, password }: signUpReq = req.body;
    try {
      const user = new User({ email, nickname, password });
      const { nickname: savedNickname, token } = await authService.signUp(user);

      return res.status(201).send(
        new Res({
          message: '회원가입 성공',
          body: {
            token,
            nickname: savedNickname,
          },
        })
      );
    } catch (e) {
      if (e instanceof AuthException) {
        switch (e.type) {
          case AuthExceptionType.Duplication:
            return res.status(409).send(new Res({ message: e.message }));
        }
      }
      console.error(e);
      return res.status(500).send(new Res({}));
    }
  },
};

export default authController;
