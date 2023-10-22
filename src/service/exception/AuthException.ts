export enum AuthExceptionType {
  Duplication = 'duplication user',
}

type AuthExceptionConstructor = {
  message?: string;
  type: AuthExceptionType;
};

class AuthException extends Error {
  type: AuthExceptionType;
  constructor({ message, type }: AuthExceptionConstructor) {
    super(message ?? type);
    this.type = type;
  }
}

export default AuthException;
