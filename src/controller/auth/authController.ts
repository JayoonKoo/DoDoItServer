import { LoginReq, SignUpReq } from './type/authControllerType';
import User from '../../model/user';
import authService from '../../service/authService';
import AuthException, { AuthExceptionType } from '../../service/exception/AuthException';
import Res from '../../lib/Res';
import env from '../../config/env';
import { CookieOptions, Response } from 'express';
import { ControllerType } from '../type';

const authController: ControllerType = {
  signUp: async (req, res, next) => {
    const { email, nickname, password }: SignUpReq = req.body;

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
      next(e);
    }
  },

  login: async (req, res, next) => {
    const { email, password }: LoginReq = req.body;
    console.log(req.body);

    try {
      const { nickname, token, refreshToken } = await authService.login({ email, password });
      setCookie(token, refreshToken, res);
      return res.status(200).send(new Res({ message: '로그인 성공', body: { nickname, token, refreshToken } }));
    } catch (e) {
      if (e instanceof AuthException) {
        console.error(e);
        switch (e.type) {
          case AuthExceptionType.NoUser:
          case AuthExceptionType.PasswordNotMatch:
            return res.status(401).send(new Res({ message: '이메일이나 비밀번호가 틀렸습니다.' }));
        }
      }
      next(e);
    }
  },

  me: async (req, res, next) => {
    const { userId } = req;
    try {
      const user = await authService.me({ userId });
      return res.status(200).send(new Res({ message: 'me 성공', body: { token: req.token, nickname: user.nickname } }));
    } catch (e) {
      console.error(e);
      if (e instanceof AuthException) {
        switch (e.type) {
          case AuthExceptionType.NoUser:
            return res.status(404).send(new Res({ message: e.message }));
        }
      }
      next(e);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const { accessToken, refreshToken, nickname } = await authService.verifyRefreshToken(req.refreshToken);
      setCookie(accessToken, refreshToken, res);
      return res
        .status(200)
        .send(new Res({ message: '로그인 성공', body: { nickname, token: accessToken, refreshToken } }));
    } catch (e) {
      console.error(e);
      if (e instanceof AuthException) {
        switch (e.type) {
          case AuthExceptionType.InvalidToken:
            return res.status(401).send(new Res({ message: e.message }));
          case AuthExceptionType.NoUser:
            return res.status(404).send(new Res({ message: e.message }));
        }
      }

      next(e);
    }
  },
};

function setCookie(token: string, refreshToken: string, res: Response) {
  const options: CookieOptions = {
    maxAge: env.jwt.expiresIn * 1000,
    httpOnly: true,
    // sameSite: 'none',
    // secure: true,
    signed: true,
  };

  const refrehOptions: CookieOptions = {
    maxAge: env.jwt.expiresRefresh * 1000,
    httpOnly: true,
    signed: true,
  };
  res.cookie('token', token, options); // HTTP-ONLY 🍪
  res.cookie('refreshToken', refreshToken, refrehOptions);
}

export default authController;
