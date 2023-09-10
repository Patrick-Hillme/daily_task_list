const mongoose = require('mongoose');

const TaskListSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: [true, 'Task name is required']
    },
    description: {
        type: String,
        // required: [true, 'A description of the task is required']
    }
}, {timestamps: true})

module.exports = mongoose.model('TaskList', TaskListSchema);