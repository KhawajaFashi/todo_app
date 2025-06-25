const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/', (req, res) => res.send('Hello, world!'));
router.post('/todos', todoController.addTodo);
router.get('/getTodos', todoController.getTodos);
router.get('/getCompletedTodos', todoController.getCompletedTodos);
router.get('/getDeletedTodos', todoController.getDeletedTodos);
router.post('/deleteTodo', todoController.deleteTodo);
router.post('/completeTodo', todoController.completeTodo);

module.exports = router;
