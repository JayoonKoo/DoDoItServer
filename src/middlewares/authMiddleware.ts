import { RequestHandler } from 'express';
import Res from '../lib/Res';
import authService from '../service/authService';

export const isAuth: RequestHandler = async (req, res, next) => {
  // header 에서 먼저 토큰 찾기
  // cookie 에서 토큰 찾기
  let token: string | null = null;

  const authHeader = req.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    token = req.signedCookies.token;
  }

  if (!token) {
    return res.status(401).send(
      new Res({
        message: 'invalid token',
      })
    );
  }

  const userId = await authService.verifyToken(token);

  req.userId = userId;
  req.token = token;
  next();
};

export const isHasRefresh: RequestHandler = async (req, res, next) => {
  let refreshToken: string | undefined;
  refreshToken = req.get('refreshToken');

  // 웹 클라이언트를 위한 셋팅
  if (!refreshToken) {
    refreshToken = req.signedCookies.refreshToken;
  }

  if (!refreshToken) {
    return res.status(401).send(
      new Res({
        message: 'invalid token',
      })
    );
  }

  req.refreshToken = refreshToken;
  next();
};
