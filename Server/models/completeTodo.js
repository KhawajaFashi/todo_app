const mongoose = require('mongoose');

const completeTodoSchema = new mongoose.Schema({
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

const compTodo = mongoose.model('compTodo', completeTodoSchema);
module.exports = compTodo;