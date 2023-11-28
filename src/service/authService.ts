import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import userRepository from '../repository/UserRepository';
import AuthException, { AuthExceptionType } from './exception/AuthException';
import User from '../model/user';
import { Login, Me, RefreshReturn } from './type/authServiceType';

const authService = {
  signUp: async ({ email, password, nickname }: User) => {
    const exUser = await userRepository.findOneBy({ email });
    if (exUser) {
      throw new AuthException({ message: '이미 가입한 사용자 입니다.', type: AuthExceptionType.Duplication });
    }

    const hashPassword = await bcrypt.hash(password, env.bcrypt.saltRounds);

    const newUser = userRepository.create({
      email,
      password: hashPassword,
      nickname,
    });
    const createUser = await userRepository.save(newUser);
    const token = authService._createJwtToken(createUser.id);

    return { token, nickname };
  },

  login: async ({ email, password }: Login) => {
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      throw new AuthException({ message: '가입한 회원이 없습니다.', type: AuthExceptionType.NoUser });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new AuthException({ message: '패스워드가 틀렸습니다.', type: AuthExceptionType.PasswordNotMatch });
    }
    const accessToken = authService._createJwtToken(user.id);
    const refreshToken = authService._createRefreshToken(user.id);

    await userRepository.update({ email }, { refreshToken });

    return { token: accessToken, refreshToken, nickname: user.nickname };
  },

  me: async ({ userId }: Me) => {
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new AuthException({ message: '사용자 정보를 찾지 못했습니다.', type: AuthExceptionType.NoUser });
    }
    return user;
  },

  verifyToken: async (token: string) => {
    return new Promise<number>((resolve, reject) => {
      jwt.verify(token, env.jwt.scretKey, async (error, decoded) => {
        if (error || !decoded) {
          return reject(new AuthException({ type: AuthExceptionType.InvalidToken }));
        }

        return resolve(decoded.id);
      });
    });
  },

  verifyRefreshToken: async (refreshToken: string) => {
    return new Promise<RefreshReturn>((resolve, reject) => {
      jwt.verify(refreshToken, env.jwt.refreshKey, async (error, decoded) => {
        if (error || !decoded) {
          return reject(new AuthException({ type: AuthExceptionType.InvalidToken }));
        }

        const user = await userRepository.findOneBy({ id: decoded.id, refreshToken: refreshToken });
        if (!user) {
          return reject(new AuthException({ type: AuthExceptionType.NoUser }));
        }

        return resolve({
          accessToken: authService._createJwtToken(decoded.id),
          refreshToken: authService._createRefreshToken(decoded.id),
          nickname: user.nickname,
        });
      });
    });
  },

  _createJwtToken: (id: number) => {
    return jwt.sign({ id }, env.jwt.scretKey, { expiresIn: env.jwt.expiresIn });
  },

  _createRefreshToken: (id: number) => {
    return jwt.sign({ id }, env.jwt.refreshKey, { expiresIn: env.jwt.expiresRefresh });
  },
};

export default authService;
