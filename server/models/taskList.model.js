const mongoose = require('mongoose');

//* Define a schema for the TaskList data structure
const TaskListSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: [true, 'Task name is required']
    },
    description: {
        type: String,
    }
}, {timestamps: true})

//* Create a mongoose model named 'TaskList' based on the 'TaskListSchema'
module.exports = mongoose.model('TaskList', TaskListSchema);