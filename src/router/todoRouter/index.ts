import express from 'express';
import todoController from '../../controller/todo/todoController';

const router = express.Router();

// /todo
router.post('/', todoController.createTodo); // post /todo

export default router;
