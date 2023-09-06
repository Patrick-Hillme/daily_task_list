const TaskListController = require('../controllers/taskList.controller')

//! Task List Routes
module.exports = app => {
    app.post('/api/newTask', TaskListController.createNewTask)
    app.get('/api/allTasks', TaskListController.getAllTasks)
    app.get('/api/oneTask/:id', TaskListController.getOneTask)
    app.patch('/api/updateTask/:id', TaskListController.updateOneTask)
    app.delete('/api/deleteTask/:id', TaskListController.deleteExistingTask)
}