type UserContructorType = {
  email: string;
  nickname: string;
  password: string;
};

class User {
  email: string;
  nickname: string;
  password: string;

  constructor({ email, nickname, password }: UserContructorType) {
    this.email = email;
    this.nickname = nickname;
    this.password = password;
  }
}

export default User;
