export type Login = {
  email: string;
  password: string;
};

export type Me = {
  userId: number;
};

export type RefreshReturn = {
  accessToken: string;
  refreshToken: string;
  nickname: string;
};
