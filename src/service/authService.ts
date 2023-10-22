import user from '../model/user';

const authService = {
  signUp: async (user: user) => {
    console.log(user);
  },
};

export default authService;
