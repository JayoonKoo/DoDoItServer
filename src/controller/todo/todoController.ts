import { ControllerType } from '../type';

const todoController: ControllerType = {
  createTodo: async (_, res) => {
    console.log('create todo');
    res.send('dd');
  },
};

export default todoController;
