const express = require('express');
const router = express.Router();
const authMiddleware = require('../middelware/protectRoute');

const {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodoById,
  toggleTodoStatusById,
  deleteTodoById,
} = require('../controllers/todo.controller');


router.post('/create', authMiddleware, createTodo);
router.get('/alltodos', authMiddleware, getAllTodos);
router.get('/:id', authMiddleware, getTodoById);
router.put('/:id', authMiddleware, updateTodoById);
router.patch('/:id/toggle', authMiddleware, toggleTodoStatusById);
router.delete('/:id', authMiddleware, deleteTodoById);

module.exports = router;