const Todo = require('../models/todo');
const delTodo = require('../models/deleteTodo');
const compTodo = require('../models/completeTodo');

exports.addTodo = async (req, res) => {
    const { todo } = req.body;
    if (!todo) return res.status(400).send('Todo item is required');

    const newTodo = new Todo({ text: todo, completed: false, createdAt: new Date() });
    await newTodo.save();
    res.status(201).send({ message: 'Todo added successfully', todo });
};

exports.getTodos = async (req, res) => {
    const todos = await Todo.find();
    if (!todos.length) return res.status(404).send('No todos found');
    res.status(200).send({ message: 'Todos fetched', data: todos });
};

exports.getCompletedTodos = async (req, res) => {
    const todos = await compTodo.find();
    if (!todos.length) return res.status(404).send('No completed todos');
    res.status(200).send({ message: 'Completed todos fetched', data: todos });
};

exports.getDeletedTodos = async (req, res) => {
    const todos = await delTodo.find();
    if (!todos.length) return res.status(404).send('No deleted todos');
    res.status(200).send({ message: 'Deleted todos fetched', data: todos });
};

exports.deleteTodo = async (req, res) => {
    const { _id, text } = req.body.todo;
    if (!_id) return res.status(400).send('Todo ID is required');

    const deleted = await Todo.findByIdAndDelete(_id);
    if (!deleted) return res.status(404).send('Todo not found');

    await new delTodo({ text, completed: false, createdAt: new Date() }).save();
    res.status(200).send({ message: 'Todo deleted', todo: deleted });
};

exports.completeTodo = async (req, res) => {
    const { _id, text } = req.body.todo;
    if (!_id) return res.status(400).send('Todo ID is required');

    const completed = await Todo.findByIdAndDelete(_id);
    if (!completed) return res.status(404).send('Todo not found');

    await new compTodo({ text, completed: true, createdAt: new Date() }).save();
    res.status(200).send({ message: 'Todo completed', todo: completed });
};
