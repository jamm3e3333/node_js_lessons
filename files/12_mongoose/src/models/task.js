const mongoose = require('mongoose');
const { model } = require('./user');

const Task = mongoose.model('Task',{
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
})

module.exports = Task;