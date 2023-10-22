import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../config/env';
import userRepository from '../repository/UserRepository';
import AuthException, { AuthExceptionType } from './exception/AuthException';
import User from '../model/user';

const authService = {
  signUp: async (user: User) => {
    const { email, password, nickname } = user;
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

  _createJwtToken: (id: number) => {
    return jwt.sign({ id }, env.jwt.scretKey, { expiresIn: env.jwt.expiresIn });
  },
};

export default authService;
