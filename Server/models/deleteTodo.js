const mongoose = require('mongoose');

const delTodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const delTodo = mongoose.model('delTodo', delTodoSchema);
module.exports = delTodo;