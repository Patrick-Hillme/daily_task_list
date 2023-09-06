const TaskListController = require('../controllers/taskList.controller')

//! Task List Routes
module.exports = app => {
    app.post('/api/newTask', TaskListController.createNewTask)
}